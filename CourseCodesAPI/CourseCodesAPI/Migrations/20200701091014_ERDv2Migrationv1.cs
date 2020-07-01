using Microsoft.EntityFrameworkCore.Migrations;

namespace CourseCodesAPI.Migrations
{
    public partial class ERDv2Migrationv1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseProblem_Courses_CourseId",
                table: "CourseProblem");

            migrationBuilder.DropForeignKey(
                name: "FK_CourseProblem_Problem_ProblemId",
                table: "CourseProblem");

            migrationBuilder.DropForeignKey(
                name: "FK_Problem_Accounts_AuthorId",
                table: "Problem");

            migrationBuilder.DropForeignKey(
                name: "FK_Solution_Problem_ProblemId",
                table: "Solution");

            migrationBuilder.DropForeignKey(
                name: "FK_Solution_Students_StudentId",
                table: "Solution");

            migrationBuilder.DropForeignKey(
                name: "FK_TestCase_Problem_ProblemId",
                table: "TestCase");

            migrationBuilder.DropForeignKey(
                name: "FK_TopicProblem_Problem_ProblemId",
                table: "TopicProblem");

            migrationBuilder.DropForeignKey(
                name: "FK_TopicProblem_Topics_TopicId",
                table: "TopicProblem");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TopicProblem",
                table: "TopicProblem");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TestCase",
                table: "TestCase");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Solution",
                table: "Solution");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Problem",
                table: "Problem");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CourseProblem",
                table: "CourseProblem");

            migrationBuilder.RenameTable(
                name: "TopicProblem",
                newName: "TopicProblems");

            migrationBuilder.RenameTable(
                name: "TestCase",
                newName: "TestCases");

            migrationBuilder.RenameTable(
                name: "Solution",
                newName: "Solutions");

            migrationBuilder.RenameTable(
                name: "Problem",
                newName: "Problems");

            migrationBuilder.RenameTable(
                name: "CourseProblem",
                newName: "CourseProblems");

            migrationBuilder.RenameIndex(
                name: "IX_TopicProblem_ProblemId",
                table: "TopicProblems",
                newName: "IX_TopicProblems_ProblemId");

            migrationBuilder.RenameIndex(
                name: "IX_TestCase_ProblemId",
                table: "TestCases",
                newName: "IX_TestCases_ProblemId");

            migrationBuilder.RenameIndex(
                name: "IX_Solution_StudentId",
                table: "Solutions",
                newName: "IX_Solutions_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_Solution_ProblemId",
                table: "Solutions",
                newName: "IX_Solutions_ProblemId");

            migrationBuilder.RenameIndex(
                name: "IX_Problem_AuthorId",
                table: "Problems",
                newName: "IX_Problems_AuthorId");

            migrationBuilder.RenameIndex(
                name: "IX_CourseProblem_ProblemId",
                table: "CourseProblems",
                newName: "IX_CourseProblems_ProblemId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TopicProblems",
                table: "TopicProblems",
                columns: new[] { "TopicId", "ProblemId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_TestCases",
                table: "TestCases",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Solutions",
                table: "Solutions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Problems",
                table: "Problems",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CourseProblems",
                table: "CourseProblems",
                columns: new[] { "CourseId", "ProblemId" });

            migrationBuilder.AddForeignKey(
                name: "FK_CourseProblems_Courses_CourseId",
                table: "CourseProblems",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseProblems_Problems_ProblemId",
                table: "CourseProblems",
                column: "ProblemId",
                principalTable: "Problems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Problems_Accounts_AuthorId",
                table: "Problems",
                column: "AuthorId",
                principalTable: "Accounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Solutions_Problems_ProblemId",
                table: "Solutions",
                column: "ProblemId",
                principalTable: "Problems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Solutions_Students_StudentId",
                table: "Solutions",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TestCases_Problems_ProblemId",
                table: "TestCases",
                column: "ProblemId",
                principalTable: "Problems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TopicProblems_Problems_ProblemId",
                table: "TopicProblems",
                column: "ProblemId",
                principalTable: "Problems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TopicProblems_Topics_TopicId",
                table: "TopicProblems",
                column: "TopicId",
                principalTable: "Topics",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseProblems_Courses_CourseId",
                table: "CourseProblems");

            migrationBuilder.DropForeignKey(
                name: "FK_CourseProblems_Problems_ProblemId",
                table: "CourseProblems");

            migrationBuilder.DropForeignKey(
                name: "FK_Problems_Accounts_AuthorId",
                table: "Problems");

            migrationBuilder.DropForeignKey(
                name: "FK_Solutions_Problems_ProblemId",
                table: "Solutions");

            migrationBuilder.DropForeignKey(
                name: "FK_Solutions_Students_StudentId",
                table: "Solutions");

            migrationBuilder.DropForeignKey(
                name: "FK_TestCases_Problems_ProblemId",
                table: "TestCases");

            migrationBuilder.DropForeignKey(
                name: "FK_TopicProblems_Problems_ProblemId",
                table: "TopicProblems");

            migrationBuilder.DropForeignKey(
                name: "FK_TopicProblems_Topics_TopicId",
                table: "TopicProblems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TopicProblems",
                table: "TopicProblems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TestCases",
                table: "TestCases");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Solutions",
                table: "Solutions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Problems",
                table: "Problems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CourseProblems",
                table: "CourseProblems");

            migrationBuilder.RenameTable(
                name: "TopicProblems",
                newName: "TopicProblem");

            migrationBuilder.RenameTable(
                name: "TestCases",
                newName: "TestCase");

            migrationBuilder.RenameTable(
                name: "Solutions",
                newName: "Solution");

            migrationBuilder.RenameTable(
                name: "Problems",
                newName: "Problem");

            migrationBuilder.RenameTable(
                name: "CourseProblems",
                newName: "CourseProblem");

            migrationBuilder.RenameIndex(
                name: "IX_TopicProblems_ProblemId",
                table: "TopicProblem",
                newName: "IX_TopicProblem_ProblemId");

            migrationBuilder.RenameIndex(
                name: "IX_TestCases_ProblemId",
                table: "TestCase",
                newName: "IX_TestCase_ProblemId");

            migrationBuilder.RenameIndex(
                name: "IX_Solutions_StudentId",
                table: "Solution",
                newName: "IX_Solution_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_Solutions_ProblemId",
                table: "Solution",
                newName: "IX_Solution_ProblemId");

            migrationBuilder.RenameIndex(
                name: "IX_Problems_AuthorId",
                table: "Problem",
                newName: "IX_Problem_AuthorId");

            migrationBuilder.RenameIndex(
                name: "IX_CourseProblems_ProblemId",
                table: "CourseProblem",
                newName: "IX_CourseProblem_ProblemId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TopicProblem",
                table: "TopicProblem",
                columns: new[] { "TopicId", "ProblemId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_TestCase",
                table: "TestCase",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Solution",
                table: "Solution",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Problem",
                table: "Problem",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CourseProblem",
                table: "CourseProblem",
                columns: new[] { "CourseId", "ProblemId" });

            migrationBuilder.AddForeignKey(
                name: "FK_CourseProblem_Courses_CourseId",
                table: "CourseProblem",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseProblem_Problem_ProblemId",
                table: "CourseProblem",
                column: "ProblemId",
                principalTable: "Problem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Problem_Accounts_AuthorId",
                table: "Problem",
                column: "AuthorId",
                principalTable: "Accounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Solution_Problem_ProblemId",
                table: "Solution",
                column: "ProblemId",
                principalTable: "Problem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Solution_Students_StudentId",
                table: "Solution",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TestCase_Problem_ProblemId",
                table: "TestCase",
                column: "ProblemId",
                principalTable: "Problem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TopicProblem_Problem_ProblemId",
                table: "TopicProblem",
                column: "ProblemId",
                principalTable: "Problem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TopicProblem_Topics_TopicId",
                table: "TopicProblem",
                column: "TopicId",
                principalTable: "Topics",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
