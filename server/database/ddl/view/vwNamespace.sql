IF OBJECT_ID('Core.vwNamespace') IS NOT NULL DROP VIEW Core.vwNamespace;
GO

CREATE VIEW Core.vwNamespace AS
WITH Base AS (
    SELECT
        NamespaceID,
        CAST(UUID AS NVARCHAR(MAX)) AS UUID,
        ParentNamespaceID,
        CAST(NULL AS NVARCHAR(MAX))  AS ParentUUID,
        [Name],
        CAST(NULL AS NVARCHAR(MAX)) AS ParentPath
    FROM
        Core.[Namespace]
    WHERE
        ParentNamespaceID IS NULL
        AND DeactivatedDateTimeUTC IS NULL

    UNION ALL

    SELECT
        n.NamespaceID,
        CAST(n.UUID AS NVARCHAR(MAX)),
        n.ParentNamespaceID,
        CAST(b.UUID AS NVARCHAR(MAX)),
        n.[Name],
        CASE
            WHEN b.ParentPath IS NULL THEN CAST(b.[Name] AS NVARCHAR(MAX))
            ELSE CAST(b.ParentPath + '.' + b.[Name] AS NVARCHAR(MAX))
        END
    FROM
        Core.[Namespace] n
        INNER JOIN Base b
            ON n.ParentNamespaceID = b.NamespaceID
    WHERE
        n.DeactivatedDateTimeUTC IS NULL
)
SELECT
    ParentNamespaceID,
    ParentUUID,
    ParentPath AS [Namespace],
    NamespaceID,
    UUID,
    [Name],
    CASE
        WHEN ParentPath IS NULL THEN [Name]
        ELSE CONCAT(ParentPath, '.', [Name])
    END AS [Path]
FROM
    Base;