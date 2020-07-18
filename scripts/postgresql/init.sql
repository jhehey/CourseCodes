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

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200620141320_BasicPasswordAuthMigration') THEN
    ALTER TABLE "Account" ADD "PasswordHash" text NULL;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200620141320_BasicPasswordAuthMigration') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20200620141320_BasicPasswordAuthMigration', '3.1.5');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200621034903_AccountRolesMigration') THEN
    ALTER TABLE "Instructors" DROP CONSTRAINT "FK_Instructors_Account_AccountId";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200621034903_AccountRolesMigration') THEN
    ALTER TABLE "Students" DROP CONSTRAINT "FK_Students_Account_AccountId";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200621034903_AccountRolesMigration') THEN
    ALTER TABLE "Account" DROP CONSTRAINT "PK_Account";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200621034903_AccountRolesMigration') THEN
    ALTER TABLE "Account" RENAME TO "Accounts";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200621034903_AccountRolesMigration') THEN
    ALTER TABLE "Accounts" ADD "AccountRole" integer NOT NULL DEFAULT 0;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200621034903_AccountRolesMigration') THEN
    ALTER TABLE "Accounts" ADD CONSTRAINT "PK_Accounts" PRIMARY KEY ("Id");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200621034903_AccountRolesMigration') THEN
    ALTER TABLE "Instructors" ADD CONSTRAINT "FK_Instructors_Accounts_AccountId" FOREIGN KEY ("AccountId") REFERENCES "Accounts" ("Id") ON DELETE CASCADE;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200621034903_AccountRolesMigration') THEN
    ALTER TABLE "Students" ADD CONSTRAINT "FK_Students_Accounts_AccountId" FOREIGN KEY ("AccountId") REFERENCES "Accounts" ("Id") ON DELETE CASCADE;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200621034903_AccountRolesMigration') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20200621034903_AccountRolesMigration', '3.1.5');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200621130410_ValidationAndConstraintsMigration') THEN
    ALTER TABLE "JoinCodes" ALTER COLUMN "PasswordHash" TYPE character varying(100);
    ALTER TABLE "JoinCodes" ALTER COLUMN "PasswordHash" DROP NOT NULL;
    ALTER TABLE "JoinCodes" ALTER COLUMN "PasswordHash" DROP DEFAULT;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200621130410_ValidationAndConstraintsMigration') THEN
    ALTER TABLE "JoinCodes" ALTER COLUMN "Code" TYPE character varying(6);
    ALTER TABLE "JoinCodes" ALTER COLUMN "Code" DROP NOT NULL;
    ALTER TABLE "JoinCodes" ALTER COLUMN "Code" DROP DEFAULT;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200621130410_ValidationAndConstraintsMigration') THEN
    ALTER TABLE "Courses" ALTER COLUMN "Title" TYPE character varying(100);
    ALTER TABLE "Courses" ALTER COLUMN "Title" SET NOT NULL;
    ALTER TABLE "Courses" ALTER COLUMN "Title" DROP DEFAULT;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200621130410_ValidationAndConstraintsMigration') THEN
    ALTER TABLE "Courses" ALTER COLUMN "Description" TYPE character varying(500);
    ALTER TABLE "Courses" ALTER COLUMN "Description" SET NOT NULL;
    ALTER TABLE "Courses" ALTER COLUMN "Description" DROP DEFAULT;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200621130410_ValidationAndConstraintsMigration') THEN
    ALTER TABLE "Accounts" ALTER COLUMN "PasswordHash" TYPE character varying(100);
    ALTER TABLE "Accounts" ALTER COLUMN "PasswordHash" SET NOT NULL;
    ALTER TABLE "Accounts" ALTER COLUMN "PasswordHash" DROP DEFAULT;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200621130410_ValidationAndConstraintsMigration') THEN
    ALTER TABLE "Accounts" ALTER COLUMN "LastName" TYPE character varying(50);
    ALTER TABLE "Accounts" ALTER COLUMN "LastName" SET NOT NULL;
    ALTER TABLE "Accounts" ALTER COLUMN "LastName" DROP DEFAULT;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200621130410_ValidationAndConstraintsMigration') THEN
    ALTER TABLE "Accounts" ALTER COLUMN "FirstName" TYPE character varying(50);
    ALTER TABLE "Accounts" ALTER COLUMN "FirstName" SET NOT NULL;
    ALTER TABLE "Accounts" ALTER COLUMN "FirstName" DROP DEFAULT;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200621130410_ValidationAndConstraintsMigration') THEN
    ALTER TABLE "Accounts" ALTER COLUMN "Email" TYPE character varying(255);
    ALTER TABLE "Accounts" ALTER COLUMN "Email" SET NOT NULL;
    ALTER TABLE "Accounts" ALTER COLUMN "Email" DROP DEFAULT;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200621130410_ValidationAndConstraintsMigration') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20200621130410_ValidationAndConstraintsMigration', '3.1.5');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200621134034_DefaultDateGeneratedOnAddMigration') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20200621134034_DefaultDateGeneratedOnAddMigration', '3.1.5');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200621134621_ValidationAndConstraintsMigration_v2') THEN
    ALTER TABLE "StudentCourses" ALTER COLUMN "DateJoined" TYPE timestamp without time zone;
    ALTER TABLE "StudentCourses" ALTER COLUMN "DateJoined" SET NOT NULL;
    ALTER TABLE "StudentCourses" ALTER COLUMN "DateJoined" DROP DEFAULT;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200621134621_ValidationAndConstraintsMigration_v2') THEN
    ALTER TABLE "Courses" ALTER COLUMN "DateCreated" TYPE timestamp without time zone;
    ALTER TABLE "Courses" ALTER COLUMN "DateCreated" SET NOT NULL;
    ALTER TABLE "Courses" ALTER COLUMN "DateCreated" DROP DEFAULT;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200621134621_ValidationAndConstraintsMigration_v2') THEN
    ALTER TABLE "Accounts" ALTER COLUMN "DateRegistered" TYPE timestamp without time zone;
    ALTER TABLE "Accounts" ALTER COLUMN "DateRegistered" SET NOT NULL;
    ALTER TABLE "Accounts" ALTER COLUMN "DateRegistered" DROP DEFAULT;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200621134621_ValidationAndConstraintsMigration_v2') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20200621134621_ValidationAndConstraintsMigration_v2', '3.1.5');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200627232321_TopicsInitialMigration') THEN
    CREATE TABLE "Topics" (
        "Id" uuid NOT NULL,
        "Title" character varying(100) NOT NULL,
        "Description" character varying(500) NULL,
        "CourseId" uuid NOT NULL,
        CONSTRAINT "PK_Topics" PRIMARY KEY ("Id"),
        CONSTRAINT "FK_Topics_Courses_CourseId" FOREIGN KEY ("CourseId") REFERENCES "Courses" ("Id") ON DELETE CASCADE
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200627232321_TopicsInitialMigration') THEN
    CREATE INDEX "IX_Topics_CourseId" ON "Topics" ("CourseId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200627232321_TopicsInitialMigration') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20200627232321_TopicsInitialMigration', '3.1.5');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701024211_ERDv2InitialMigrations') THEN
    DROP INDEX "IX_Students_AccountId";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701024211_ERDv2InitialMigrations') THEN
    DROP INDEX "IX_Instructors_AccountId";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701024211_ERDv2InitialMigrations') THEN
    CREATE TABLE "Problem" (
        "Id" uuid NOT NULL,
        "Title" character varying(100) NOT NULL,
        "Statement" text NOT NULL,
        "AuthorId" uuid NOT NULL,
        CONSTRAINT "PK_Problem" PRIMARY KEY ("Id"),
        CONSTRAINT "FK_Problem_Accounts_AuthorId" FOREIGN KEY ("AuthorId") REFERENCES "Accounts" ("Id") ON DELETE CASCADE
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701024211_ERDv2InitialMigrations') THEN
    CREATE TABLE "CourseProblem" (
        "CourseId" uuid NOT NULL,
        "ProblemId" uuid NOT NULL,
        CONSTRAINT "PK_CourseProblem" PRIMARY KEY ("CourseId", "ProblemId"),
        CONSTRAINT "FK_CourseProblem_Courses_CourseId" FOREIGN KEY ("CourseId") REFERENCES "Courses" ("Id") ON DELETE CASCADE,
        CONSTRAINT "FK_CourseProblem_Problem_ProblemId" FOREIGN KEY ("ProblemId") REFERENCES "Problem" ("Id") ON DELETE CASCADE
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701024211_ERDv2InitialMigrations') THEN
    CREATE TABLE "Solution" (
        "Id" uuid NOT NULL,
        "SourceCode" text NOT NULL,
        "Status" integer NOT NULL,
        "DateSubmitted" timestamp without time zone NOT NULL,
        "StudentId" uuid NOT NULL,
        "ProblemId" uuid NOT NULL,
        CONSTRAINT "PK_Solution" PRIMARY KEY ("Id"),
        CONSTRAINT "FK_Solution_Problem_ProblemId" FOREIGN KEY ("ProblemId") REFERENCES "Problem" ("Id") ON DELETE CASCADE,
        CONSTRAINT "FK_Solution_Students_StudentId" FOREIGN KEY ("StudentId") REFERENCES "Students" ("Id") ON DELETE CASCADE
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701024211_ERDv2InitialMigrations') THEN
    CREATE TABLE "TestCase" (
        "Id" uuid NOT NULL,
        "SampleInput" text NOT NULL,
        "ExpectedOutput" text NOT NULL,
        "ProblemId" uuid NOT NULL,
        CONSTRAINT "PK_TestCase" PRIMARY KEY ("Id"),
        CONSTRAINT "FK_TestCase_Problem_ProblemId" FOREIGN KEY ("ProblemId") REFERENCES "Problem" ("Id") ON DELETE CASCADE
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701024211_ERDv2InitialMigrations') THEN
    CREATE TABLE "TopicProblem" (
        "TopicId" uuid NOT NULL,
        "ProblemId" uuid NOT NULL,
        CONSTRAINT "PK_TopicProblem" PRIMARY KEY ("TopicId", "ProblemId"),
        CONSTRAINT "FK_TopicProblem_Problem_ProblemId" FOREIGN KEY ("ProblemId") REFERENCES "Problem" ("Id") ON DELETE CASCADE,
        CONSTRAINT "FK_TopicProblem_Topics_TopicId" FOREIGN KEY ("TopicId") REFERENCES "Topics" ("Id") ON DELETE CASCADE
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701024211_ERDv2InitialMigrations') THEN
    CREATE UNIQUE INDEX "IX_Students_AccountId" ON "Students" ("AccountId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701024211_ERDv2InitialMigrations') THEN
    CREATE UNIQUE INDEX "IX_Instructors_AccountId" ON "Instructors" ("AccountId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701024211_ERDv2InitialMigrations') THEN
    CREATE INDEX "IX_CourseProblem_ProblemId" ON "CourseProblem" ("ProblemId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701024211_ERDv2InitialMigrations') THEN
    CREATE INDEX "IX_Problem_AuthorId" ON "Problem" ("AuthorId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701024211_ERDv2InitialMigrations') THEN
    CREATE INDEX "IX_Solution_ProblemId" ON "Solution" ("ProblemId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701024211_ERDv2InitialMigrations') THEN
    CREATE INDEX "IX_Solution_StudentId" ON "Solution" ("StudentId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701024211_ERDv2InitialMigrations') THEN
    CREATE INDEX "IX_TestCase_ProblemId" ON "TestCase" ("ProblemId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701024211_ERDv2InitialMigrations') THEN
    CREATE INDEX "IX_TopicProblem_ProblemId" ON "TopicProblem" ("ProblemId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701024211_ERDv2InitialMigrations') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20200701024211_ERDv2InitialMigrations', '3.1.5');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER TABLE "CourseProblem" DROP CONSTRAINT "FK_CourseProblem_Courses_CourseId";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER TABLE "CourseProblem" DROP CONSTRAINT "FK_CourseProblem_Problem_ProblemId";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER TABLE "Problem" DROP CONSTRAINT "FK_Problem_Accounts_AuthorId";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER TABLE "Solution" DROP CONSTRAINT "FK_Solution_Problem_ProblemId";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER TABLE "Solution" DROP CONSTRAINT "FK_Solution_Students_StudentId";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER TABLE "TestCase" DROP CONSTRAINT "FK_TestCase_Problem_ProblemId";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER TABLE "TopicProblem" DROP CONSTRAINT "FK_TopicProblem_Problem_ProblemId";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER TABLE "TopicProblem" DROP CONSTRAINT "FK_TopicProblem_Topics_TopicId";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER TABLE "TopicProblem" DROP CONSTRAINT "PK_TopicProblem";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER TABLE "TestCase" DROP CONSTRAINT "PK_TestCase";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER TABLE "Solution" DROP CONSTRAINT "PK_Solution";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER TABLE "Problem" DROP CONSTRAINT "PK_Problem";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER TABLE "CourseProblem" DROP CONSTRAINT "PK_CourseProblem";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER TABLE "TopicProblem" RENAME TO "TopicProblems";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER TABLE "TestCase" RENAME TO "TestCases";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER TABLE "Solution" RENAME TO "Solutions";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER TABLE "Problem" RENAME TO "Problems";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER TABLE "CourseProblem" RENAME TO "CourseProblems";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER INDEX "IX_TopicProblem_ProblemId" RENAME TO "IX_TopicProblems_ProblemId";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER INDEX "IX_TestCase_ProblemId" RENAME TO "IX_TestCases_ProblemId";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER INDEX "IX_Solution_StudentId" RENAME TO "IX_Solutions_StudentId";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER INDEX "IX_Solution_ProblemId" RENAME TO "IX_Solutions_ProblemId";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER INDEX "IX_Problem_AuthorId" RENAME TO "IX_Problems_AuthorId";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER INDEX "IX_CourseProblem_ProblemId" RENAME TO "IX_CourseProblems_ProblemId";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER TABLE "TopicProblems" ADD CONSTRAINT "PK_TopicProblems" PRIMARY KEY ("TopicId", "ProblemId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER TABLE "TestCases" ADD CONSTRAINT "PK_TestCases" PRIMARY KEY ("Id");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER TABLE "Solutions" ADD CONSTRAINT "PK_Solutions" PRIMARY KEY ("Id");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER TABLE "Problems" ADD CONSTRAINT "PK_Problems" PRIMARY KEY ("Id");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER TABLE "CourseProblems" ADD CONSTRAINT "PK_CourseProblems" PRIMARY KEY ("CourseId", "ProblemId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER TABLE "CourseProblems" ADD CONSTRAINT "FK_CourseProblems_Courses_CourseId" FOREIGN KEY ("CourseId") REFERENCES "Courses" ("Id") ON DELETE CASCADE;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER TABLE "CourseProblems" ADD CONSTRAINT "FK_CourseProblems_Problems_ProblemId" FOREIGN KEY ("ProblemId") REFERENCES "Problems" ("Id") ON DELETE CASCADE;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER TABLE "Problems" ADD CONSTRAINT "FK_Problems_Accounts_AuthorId" FOREIGN KEY ("AuthorId") REFERENCES "Accounts" ("Id") ON DELETE CASCADE;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER TABLE "Solutions" ADD CONSTRAINT "FK_Solutions_Problems_ProblemId" FOREIGN KEY ("ProblemId") REFERENCES "Problems" ("Id") ON DELETE CASCADE;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER TABLE "Solutions" ADD CONSTRAINT "FK_Solutions_Students_StudentId" FOREIGN KEY ("StudentId") REFERENCES "Students" ("Id") ON DELETE CASCADE;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER TABLE "TestCases" ADD CONSTRAINT "FK_TestCases_Problems_ProblemId" FOREIGN KEY ("ProblemId") REFERENCES "Problems" ("Id") ON DELETE CASCADE;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER TABLE "TopicProblems" ADD CONSTRAINT "FK_TopicProblems_Problems_ProblemId" FOREIGN KEY ("ProblemId") REFERENCES "Problems" ("Id") ON DELETE CASCADE;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    ALTER TABLE "TopicProblems" ADD CONSTRAINT "FK_TopicProblems_Topics_TopicId" FOREIGN KEY ("TopicId") REFERENCES "Topics" ("Id") ON DELETE CASCADE;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200701091014_ERDv2Migrationv1') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20200701091014_ERDv2Migrationv1', '3.1.5');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200709041406_UpdatedCourseEntityMigration') THEN
    ALTER TABLE "Courses" DROP COLUMN "Description";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200709041406_UpdatedCourseEntityMigration') THEN
    ALTER TABLE "Courses" DROP COLUMN "Title";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200709041406_UpdatedCourseEntityMigration') THEN
    ALTER TABLE "Courses" ADD "Capacity" integer NOT NULL DEFAULT 0;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200709041406_UpdatedCourseEntityMigration') THEN
    ALTER TABLE "Courses" ADD "CourseName" character varying(100) NOT NULL DEFAULT '';
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200709041406_UpdatedCourseEntityMigration') THEN
    ALTER TABLE "Courses" ADD "Section" character varying(10) NOT NULL DEFAULT '';
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200709041406_UpdatedCourseEntityMigration') THEN
    ALTER TABLE "Courses" ADD "Term" character varying(10) NOT NULL DEFAULT '';
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200709041406_UpdatedCourseEntityMigration') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20200709041406_UpdatedCourseEntityMigration', '3.1.5');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200709050213_FixCourseTermLengthMigration') THEN
    ALTER TABLE "Courses" ALTER COLUMN "Term" TYPE character varying(20);
    ALTER TABLE "Courses" ALTER COLUMN "Term" SET NOT NULL;
    ALTER TABLE "Courses" ALTER COLUMN "Term" DROP DEFAULT;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200709050213_FixCourseTermLengthMigration') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20200709050213_FixCourseTermLengthMigration', '3.1.5');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200711003653_SolutionToCourseProblemMigration') THEN
    ALTER TABLE "Solutions" DROP CONSTRAINT "FK_Solutions_Problems_ProblemId";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200711003653_SolutionToCourseProblemMigration') THEN
    DROP INDEX "IX_Solutions_ProblemId";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200711003653_SolutionToCourseProblemMigration') THEN
    ALTER TABLE "CourseProblems" DROP CONSTRAINT "PK_CourseProblems";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200711003653_SolutionToCourseProblemMigration') THEN
    ALTER TABLE "Solutions" DROP COLUMN "ProblemId";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200711003653_SolutionToCourseProblemMigration') THEN
    ALTER TABLE "Solutions" ADD "CourseProblemId" uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200711003653_SolutionToCourseProblemMigration') THEN
    ALTER TABLE "CourseProblems" ADD "Id" uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200711003653_SolutionToCourseProblemMigration') THEN
    ALTER TABLE "CourseProblems" ADD CONSTRAINT "PK_CourseProblems" PRIMARY KEY ("Id");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200711003653_SolutionToCourseProblemMigration') THEN
    CREATE INDEX "IX_Solutions_CourseProblemId" ON "Solutions" ("CourseProblemId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200711003653_SolutionToCourseProblemMigration') THEN
    CREATE INDEX "IX_CourseProblems_CourseId" ON "CourseProblems" ("CourseId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200711003653_SolutionToCourseProblemMigration') THEN
    ALTER TABLE "Solutions" ADD CONSTRAINT "FK_Solutions_CourseProblems_CourseProblemId" FOREIGN KEY ("CourseProblemId") REFERENCES "CourseProblems" ("Id") ON DELETE CASCADE;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200711003653_SolutionToCourseProblemMigration') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20200711003653_SolutionToCourseProblemMigration', '3.1.5');
    END IF;
END $$;
