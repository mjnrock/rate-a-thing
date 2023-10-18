-- USE RateAThing
-- GO

-- CREATE SCHEMA Core
-- GO

IF OBJECT_ID('Core.Entry') IS NOT NULL DROP TABLE Core.[Entry];
IF OBJECT_ID('Core.Instance') IS NOT NULL DROP TABLE Core.[Instance];
IF OBJECT_ID('Core.Structure') IS NOT NULL DROP TABLE Core.[Structure];
IF OBJECT_ID('Core.Template') IS NOT NULL DROP TABLE Core.[Template];
IF OBJECT_ID('Core.Element') IS NOT NULL DROP TABLE Core.[Element];
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

/* A repository for storing the raw schema of a given Element */
CREATE TABLE Core.Element (
    ElementID INT IDENTITY(1,1) PRIMARY KEY,
    NamespaceID INT NOT NULL REFERENCES Core.[Namespace](NamespaceID) DEFAULT 1,  -- A default storage location for Elements
    [Schema] NVARCHAR(MAX) NOT NULL,

    [Type] AS CAST(JSON_VALUE([Schema], '$.$type') AS VARCHAR(255)) PERSISTED,
    [SubType] AS CAST(JSON_VALUE([Schema], '$.$subtype') AS VARCHAR(255)) PERSISTED,
    Tags AS CAST(JSON_QUERY([Schema], '$.$tags') AS NVARCHAR(MAX)) PERSISTED,

    UUID UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    CreatedDateTimeUTC DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    ModifiedDateTimeUTC DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    DeactivatedDateTimeUTC DATETIME2(0) NULL
);

/* An architectural grouping for nesting Elements */
CREATE TABLE Core.Template (
    TemplateID INT IDENTITY(1,1) PRIMARY KEY,
    NamespaceID INT NOT NULL REFERENCES Core.[Namespace](NamespaceID) DEFAULT 1,  -- Allows Templates to be in Namespaces that are different from their Elements
    [Name] NVARCHAR(255) NOT NULL,

    UUID UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    CreatedDateTimeUTC DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    ModifiedDateTimeUTC DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    DeactivatedDateTimeUTC DATETIME2(0) NULL
);
/* The "row level" of a Template, which is a single Element and where it should be reconsigned in the Template */
CREATE TABLE Core.Structure (
    StructureID INT IDENTITY(1,1) PRIMARY KEY,
    TemplateID INT NOT NULL REFERENCES Core.[Template](TemplateID),
    ElementID INT NOT NULL REFERENCES Core.Element(ElementID),
    [Path] NVARCHAR(MAX) NOT NULL,

    UUID UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    CreatedDateTimeUTC DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    ModifiedDateTimeUTC DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    DeactivatedDateTimeUTC DATETIME2(0) NULL
);

/* An instantiation of a Template */
CREATE TABLE Core.Instance (
    InstanceID INT IDENTITY(1,1) PRIMARY KEY,
    TemplateID INT NOT NULL REFERENCES Core.[Template](TemplateID),
    Context NVARCHAR(MAX) NOT NULL,

    UUID UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    CreatedDateTimeUTC DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    ModifiedDateTimeUTC DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    DeactivatedDateTimeUTC DATETIME2(0) NULL
);
/* The "row level" data of an instantiation of a Template */
CREATE TABLE Core.[Entry] (
    EntryID INT IDENTITY(1,1) PRIMARY KEY,
    InstanceID INT NOT NULL REFERENCES Core.Instance(InstanceID),
    ElementID INT NOT NULL REFERENCES Core.Element(ElementID),
    [Value] NVARCHAR(MAX) NOT NULL,

    UUID UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    CreatedDateTimeUTC DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    ModifiedDateTimeUTC DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    DeactivatedDateTimeUTC DATETIME2(0) NULL
);