using ExpenseTracker.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace ExpenseTracker.DAL
{
    public class ExpenseDbContext : DbContext
    {
        public ExpenseDbContext(DbContextOptions<ExpenseDbContext> options) : base(options)
        {

        }

        public DbSet<Expense> Expense { get; set; }
        

    }
}
