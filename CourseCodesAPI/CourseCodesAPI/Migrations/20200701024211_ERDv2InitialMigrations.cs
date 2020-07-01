using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CourseCodesAPI.Migrations
{
    public partial class ERDv2InitialMigrations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Students_AccountId",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_Instructors_AccountId",
                table: "Instructors");

            migrationBuilder.CreateTable(
                name: "Problem",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Title = table.Column<string>(maxLength: 100, nullable: false),
                    Statement = table.Column<string>(type: "text", nullable: false),
                    AuthorId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Problem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Problem_Accounts_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CourseProblem",
                columns: table => new
                {
                    CourseId = table.Column<Guid>(nullable: false),
                    ProblemId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseProblem", x => new { x.CourseId, x.ProblemId });
                    table.ForeignKey(
                        name: "FK_CourseProblem_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseProblem_Problem_ProblemId",
                        column: x => x.ProblemId,
                        principalTable: "Problem",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Solution",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    SourceCode = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<int>(nullable: false),
                    DateSubmitted = table.Column<DateTime>(nullable: false),
                    StudentId = table.Column<Guid>(nullable: false),
                    ProblemId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Solution", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Solution_Problem_ProblemId",
                        column: x => x.ProblemId,
                        principalTable: "Problem",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Solution_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TestCase",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    SampleInput = table.Column<string>(type: "text", nullable: false),
                    ExpectedOutput = table.Column<string>(type: "text", nullable: false),
                    ProblemId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestCase", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TestCase_Problem_ProblemId",
                        column: x => x.ProblemId,
                        principalTable: "Problem",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TopicProblem",
                columns: table => new
                {
                    TopicId = table.Column<Guid>(nullable: false),
                    ProblemId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TopicProblem", x => new { x.TopicId, x.ProblemId });
                    table.ForeignKey(
                        name: "FK_TopicProblem_Problem_ProblemId",
                        column: x => x.ProblemId,
                        principalTable: "Problem",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TopicProblem_Topics_TopicId",
                        column: x => x.TopicId,
                        principalTable: "Topics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Students_AccountId",
                table: "Students",
                column: "AccountId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Instructors_AccountId",
                table: "Instructors",
                column: "AccountId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CourseProblem_ProblemId",
                table: "CourseProblem",
                column: "ProblemId");

            migrationBuilder.CreateIndex(
                name: "IX_Problem_AuthorId",
                table: "Problem",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_Solution_ProblemId",
                table: "Solution",
                column: "ProblemId");

            migrationBuilder.CreateIndex(
                name: "IX_Solution_StudentId",
                table: "Solution",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_TestCase_ProblemId",
                table: "TestCase",
                column: "ProblemId");

            migrationBuilder.CreateIndex(
                name: "IX_TopicProblem_ProblemId",
                table: "TopicProblem",
                column: "ProblemId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CourseProblem");

            migrationBuilder.DropTable(
                name: "Solution");

            migrationBuilder.DropTable(
                name: "TestCase");

            migrationBuilder.DropTable(
                name: "TopicProblem");

            migrationBuilder.DropTable(
                name: "Problem");

            migrationBuilder.DropIndex(
                name: "IX_Students_AccountId",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_Instructors_AccountId",
                table: "Instructors");

            migrationBuilder.CreateIndex(
                name: "IX_Students_AccountId",
                table: "Students",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_Instructors_AccountId",
                table: "Instructors",
                column: "AccountId");
        }
    }
}
