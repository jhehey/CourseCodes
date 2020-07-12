using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CourseCodesAPI.Migrations
{
    public partial class SolutionToCourseProblemMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Solutions_Problems_ProblemId",
                table: "Solutions");

            migrationBuilder.DropIndex(
                name: "IX_Solutions_ProblemId",
                table: "Solutions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CourseProblems",
                table: "CourseProblems");

            migrationBuilder.DropColumn(
                name: "ProblemId",
                table: "Solutions");

            migrationBuilder.AddColumn<Guid>(
                name: "CourseProblemId",
                table: "Solutions",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "CourseProblems",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_CourseProblems",
                table: "CourseProblems",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Solutions_CourseProblemId",
                table: "Solutions",
                column: "CourseProblemId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseProblems_CourseId",
                table: "CourseProblems",
                column: "CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Solutions_CourseProblems_CourseProblemId",
                table: "Solutions",
                column: "CourseProblemId",
                principalTable: "CourseProblems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Solutions_CourseProblems_CourseProblemId",
                table: "Solutions");

            migrationBuilder.DropIndex(
                name: "IX_Solutions_CourseProblemId",
                table: "Solutions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CourseProblems",
                table: "CourseProblems");

            migrationBuilder.DropIndex(
                name: "IX_CourseProblems_CourseId",
                table: "CourseProblems");

            migrationBuilder.DropColumn(
                name: "CourseProblemId",
                table: "Solutions");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "CourseProblems");

            migrationBuilder.AddColumn<Guid>(
                name: "ProblemId",
                table: "Solutions",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_CourseProblems",
                table: "CourseProblems",
                columns: new[] { "CourseId", "ProblemId" });

            migrationBuilder.CreateIndex(
                name: "IX_Solutions_ProblemId",
                table: "Solutions",
                column: "ProblemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Solutions_Problems_ProblemId",
                table: "Solutions",
                column: "ProblemId",
                principalTable: "Problems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
