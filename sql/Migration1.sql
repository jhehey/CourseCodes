CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);


DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200619154128_InitialMigration') THEN
    CREATE TABLE "Instructors" (
        "Id" uuid NOT NULL,
        "Account_FirstName" text NULL,
        "Account_LastName" text NULL,
        "Account_Email" text NULL,
        "Account_DateRegistered" timestamp without time zone NULL,
        CONSTRAINT "PK_Instructors" PRIMARY KEY ("Id")
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200619154128_InitialMigration') THEN
    CREATE TABLE "Students" (
        "Id" uuid NOT NULL,
        "Account_FirstName" text NULL,
        "Account_LastName" text NULL,
        "Account_Email" text NULL,
        "Account_DateRegistered" timestamp without time zone NULL,
        CONSTRAINT "PK_Students" PRIMARY KEY ("Id")
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200619154128_InitialMigration') THEN
    CREATE TABLE "Courses" (
        "Id" uuid NOT NULL,
        "Title" text NULL,
        "Description" text NULL,
        "DateCreated" timestamp without time zone NOT NULL,
        "InstructorId" uuid NOT NULL,
        CONSTRAINT "PK_Courses" PRIMARY KEY ("Id"),
        CONSTRAINT "FK_Courses_Instructors_InstructorId" FOREIGN KEY ("InstructorId") REFERENCES "Instructors" ("Id") ON DELETE CASCADE
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200619154128_InitialMigration') THEN
    CREATE TABLE "JoinCodes" (
        "Id" uuid NOT NULL,
        "Code" text NULL,
        "PasswordHash" text NULL,
        "DateExpires" timestamp without time zone NOT NULL,
        "CourseId" uuid NOT NULL,
        CONSTRAINT "PK_JoinCodes" PRIMARY KEY ("Id"),
        CONSTRAINT "FK_JoinCodes_Courses_CourseId" FOREIGN KEY ("CourseId") REFERENCES "Courses" ("Id") ON DELETE CASCADE
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200619154128_InitialMigration') THEN
    CREATE TABLE "StudentCourses" (
        "StudentId" uuid NOT NULL,
        "CourseId" uuid NOT NULL,
        "DateJoined" timestamp without time zone NOT NULL,
        CONSTRAINT "PK_StudentCourses" PRIMARY KEY ("StudentId", "CourseId"),
        CONSTRAINT "FK_StudentCourses_Courses_CourseId" FOREIGN KEY ("CourseId") REFERENCES "Courses" ("Id") ON DELETE CASCADE,
        CONSTRAINT "FK_StudentCourses_Students_StudentId" FOREIGN KEY ("StudentId") REFERENCES "Students" ("Id") ON DELETE CASCADE
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200619154128_InitialMigration') THEN
    CREATE INDEX "IX_Courses_InstructorId" ON "Courses" ("InstructorId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200619154128_InitialMigration') THEN
    CREATE UNIQUE INDEX "IX_JoinCodes_CourseId" ON "JoinCodes" ("CourseId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200619154128_InitialMigration') THEN
    CREATE INDEX "IX_StudentCourses_CourseId" ON "StudentCourses" ("CourseId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200619154128_InitialMigration') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20200619154128_InitialMigration', '3.1.5');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200619155135_WithAccountTableMigration') THEN
    ALTER TABLE "Students" DROP COLUMN "Account_DateRegistered";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200619155135_WithAccountTableMigration') THEN
    ALTER TABLE "Students" DROP COLUMN "Account_Email";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200619155135_WithAccountTableMigration') THEN
    ALTER TABLE "Students" DROP COLUMN "Account_FirstName";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200619155135_WithAccountTableMigration') THEN
    ALTER TABLE "Students" DROP COLUMN "Account_LastName";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200619155135_WithAccountTableMigration') THEN
    ALTER TABLE "Instructors" DROP COLUMN "Account_DateRegistered";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200619155135_WithAccountTableMigration') THEN
    ALTER TABLE "Instructors" DROP COLUMN "Account_Email";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200619155135_WithAccountTableMigration') THEN
    ALTER TABLE "Instructors" DROP COLUMN "Account_FirstName";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200619155135_WithAccountTableMigration') THEN
    ALTER TABLE "Instructors" DROP COLUMN "Account_LastName";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200619155135_WithAccountTableMigration') THEN
    ALTER TABLE "Students" ADD "AccountId" uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200619155135_WithAccountTableMigration') THEN
    ALTER TABLE "Instructors" ADD "AccountId" uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200619155135_WithAccountTableMigration') THEN
    CREATE TABLE "Account" (
        "Id" uuid NOT NULL,
        "FirstName" text NULL,
        "LastName" text NULL,
        "Email" text NULL,
        "DateRegistered" timestamp without time zone NOT NULL,
        CONSTRAINT "PK_Account" PRIMARY KEY ("Id")
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200619155135_WithAccountTableMigration') THEN
    CREATE INDEX "IX_Students_AccountId" ON "Students" ("AccountId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200619155135_WithAccountTableMigration') THEN
    CREATE INDEX "IX_Instructors_AccountId" ON "Instructors" ("AccountId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200619155135_WithAccountTableMigration') THEN
    ALTER TABLE "Instructors" ADD CONSTRAINT "FK_Instructors_Account_AccountId" FOREIGN KEY ("AccountId") REFERENCES "Account" ("Id") ON DELETE CASCADE;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200619155135_WithAccountTableMigration') THEN
    ALTER TABLE "Students" ADD CONSTRAINT "FK_Students_Account_AccountId" FOREIGN KEY ("AccountId") REFERENCES "Account" ("Id") ON DELETE CASCADE;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200619155135_WithAccountTableMigration') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20200619155135_WithAccountTableMigration', '3.1.5');
    END IF;
END $$;
