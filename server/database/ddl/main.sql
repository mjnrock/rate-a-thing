-- USE RateAThing
-- GO

-- CREATE SCHEMA Core
-- GO

IF OBJECT_ID('Core.Instance') IS NOT NULL DROP TABLE Core.[Instance];
IF OBJECT_ID('Core.Template') IS NOT NULL DROP TABLE Core.[Template];
IF OBJECT_ID('Core.Namespace') IS NOT NULL DROP TABLE Core.[Namespace];
GO

/* As there are likely to be redundant namings, Namespaces allow for a hierarchical organization of Elements */
CREATE TABLE Core.[Namespace] (
    NamespaceID INT IDENTITY(1,1) PRIMARY KEY,
    ParentNamespaceID INT NULL REFERENCES Core.[Namespace](NamespaceID),
    [Name] NVARCHAR(255) NOT NULL,

    UUID UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    CreatedDateTimeUTC DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    ModifiedDateTimeUTC DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    DeactivatedDateTimeUTC DATETIME2(0) NULL
);
INSERT INTO Core.[Namespace] ([Name])
VALUES ('RateAThing');  -- A default Namespace for the system

/* An architectural grouping for nesting Elements */
CREATE TABLE Core.Template (
    TemplateID INT IDENTITY(1,1) PRIMARY KEY,
    NamespaceID INT NOT NULL REFERENCES Core.[Namespace](NamespaceID) DEFAULT 1,
    
    [Name] NVARCHAR(255) NOT NULL,
    [Schema] NVARCHAR(MAX) NOT NULL,    -- This should be the raw JSON Schema for the Template (i.e. the entire template should be reconstitutable from this field)
    Tags AS CAST(JSON_QUERY([Schema], '$.$tags') AS NVARCHAR(MAX)) PERSISTED,   -- Extract the Tags from the Schema for better querying
    [Version] INT NOT NULL DEFAULT 1,   -- A simple versioning to better support the evolution of Templates vis-a-vis their Instances

    UUID UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    CreatedDateTimeUTC DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    ModifiedDateTimeUTC DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    DeactivatedDateTimeUTC DATETIME2(0) NULL
);

/* An instantiation of a Template */
CREATE TABLE Core.Instance (
    InstanceID INT IDENTITY(1,1) PRIMARY KEY,
    TemplateID INT NOT NULL REFERENCES Core.[Template](TemplateID),
    [Version] INT NOT NULL DEFAULT 1, -- The version of the Template that this Instance is based on
    [Data] NVARCHAR(MAX) NOT NULL,  -- This should be a flattened UUID:Value mapping of the Template's elements

    UUID UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    CreatedDateTimeUTC DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    ModifiedDateTimeUTC DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    DeactivatedDateTimeUTC DATETIME2(0) NULL
);
GO


-- Create a change trigger that increments Version by 1 any time the Schema is updated
CREATE TRIGGER Core.Template_UpdateVersion
ON Core.Template
AFTER UPDATE
AS
BEGIN
    IF UPDATE([Schema])
    BEGIN
        UPDATE t
        SET
            t.[Version] = t.[Version] + 1,
            t.ModifiedDateTimeUTC = SYSUTCDATETIME()
        FROM
            Core.Template t
            INNER JOIN inserted i
                ON i.TemplateID = t.TemplateID
    END
END