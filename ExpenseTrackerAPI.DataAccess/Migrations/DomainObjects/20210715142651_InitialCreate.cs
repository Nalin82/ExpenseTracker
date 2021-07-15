using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ExpenseTracker.DAL.Migrations.DomainObjects
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Expense",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Year = table.Column<int>(type: "int", nullable: false),
                    Month = table.Column<int>(type: "int", nullable: false),
                    Research = table.Column<decimal>(type: "Money", nullable: false),
                    Canteen = table.Column<decimal>(type: "Money", nullable: false),
                    CarMaintenance = table.Column<decimal>(type: "Money", nullable: false),
                    Marketing = table.Column<decimal>(type: "Money", nullable: false),
                    ParkingFines = table.Column<decimal>(type: "Money", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Expense", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Expense");
        }
    }
}
