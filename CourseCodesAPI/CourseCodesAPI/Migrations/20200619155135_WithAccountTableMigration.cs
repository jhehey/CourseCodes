using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CourseCodesAPI.Migrations
{
    public partial class WithAccountTableMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Account_DateRegistered",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Account_Email",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Account_FirstName",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Account_LastName",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Account_DateRegistered",
                table: "Instructors");

            migrationBuilder.DropColumn(
                name: "Account_Email",
                table: "Instructors");

            migrationBuilder.DropColumn(
                name: "Account_FirstName",
                table: "Instructors");

            migrationBuilder.DropColumn(
                name: "Account_LastName",
                table: "Instructors");

            migrationBuilder.AddColumn<Guid>(
                name: "AccountId",
                table: "Students",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "AccountId",
                table: "Instructors",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "Account",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    DateRegistered = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Account", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Students_AccountId",
                table: "Students",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_Instructors_AccountId",
                table: "Instructors",
                column: "AccountId");

            migrationBuilder.AddForeignKey(
                name: "FK_Instructors_Account_AccountId",
                table: "Instructors",
                column: "AccountId",
                principalTable: "Account",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Account_AccountId",
                table: "Students",
                column: "AccountId",
                principalTable: "Account",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Instructors_Account_AccountId",
                table: "Instructors");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Account_AccountId",
                table: "Students");

            migrationBuilder.DropTable(
                name: "Account");

            migrationBuilder.DropIndex(
                name: "IX_Students_AccountId",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_Instructors_AccountId",
                table: "Instructors");

            migrationBuilder.DropColumn(
                name: "AccountId",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "AccountId",
                table: "Instructors");

            migrationBuilder.AddColumn<DateTime>(
                name: "Account_DateRegistered",
                table: "Students",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Account_Email",
                table: "Students",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Account_FirstName",
                table: "Students",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Account_LastName",
                table: "Students",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Account_DateRegistered",
                table: "Instructors",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Account_Email",
                table: "Instructors",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Account_FirstName",
                table: "Instructors",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Account_LastName",
                table: "Instructors",
                type: "text",
                nullable: true);
        }
    }
}
