using Microsoft.EntityFrameworkCore.Migrations;

namespace CourseCodesAPI.Migrations
{
    public partial class BasicPasswordAuthMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PasswordHash",
                table: "Account",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Account");
        }
    }
}
