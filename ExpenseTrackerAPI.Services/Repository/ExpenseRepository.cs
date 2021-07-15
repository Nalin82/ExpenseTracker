using ExpenseTracker.DAL;
using ExpenseTracker.Models;
using ExpenseTracker.Models.DTO;
using ExpenseTracker.Services.Utility;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpenseTracker.Services
{
    public class ExpenseRepository : IExpenseRepository
    {
        readonly ExpenseDbContext dbContext;

        public ExpenseRepository(ExpenseDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<bool> AddExpense(Expense expense)
        {
            bool isSucceeded = false;
            if (expense == null)
            {
                throw new ArgumentNullException(nameof(expense));
            }

            dbContext.Add(expense);
            isSucceeded = await SaveChangesAsync();
            return isSucceeded;
        }


        public async Task<bool> UpdateExpense(int existingId,Expense expense)
        {
            bool isSucceeded = false;

            var existingExpense = await dbContext.Expense.FindAsync(existingId);
            if(existingExpense != null)
            {
                existingExpense.Canteen = expense.Canteen;
                existingExpense.CarMaintenance = expense.CarMaintenance;
                existingExpense.Research = expense.Research;
                existingExpense.Marketing = expense.Marketing;
                existingExpense.ParkingFines = expense.ParkingFines;
                existingExpense.ModifiedDate = expense.ModifiedDate;
                existingExpense.ModifiedName = expense.ModifiedName;

                dbContext.Update(existingExpense);
                isSucceeded = await SaveChangesAsync();
            }

            return isSucceeded;
        }

        public async Task<IEnumerable<Expense>> GetExpensesByPeriodAsync(PeriodDto dateRange)
        {

            //return await dbContext.Expense.
            //    Where(x =>x.Year == dateRange.FromYear && x.Month >= dateRange.FromMonth 
            //    ||    x.Year > dateRange.FromYear && x.Year < dateRange.ToYear 
            //    ||    x.Year == dateRange.ToYear && x.Month <= dateRange.ToMonth
            //     ).ToListAsync();

            return await dbContext.Expense.Where(x =>
                                            (x.Year > dateRange.FromYear ||
                                            (x.Year == dateRange.FromYear && 
                                            (x.Month > dateRange.FromMonth || 
                                            (x.Month == dateRange.FromMonth))))
                                         && (x.Year < dateRange.ToYear ||
                                            (x.Year == dateRange.ToYear &&
                                            (x.Month < dateRange.ToMonth || 
                                            (x.Month == dateRange.ToMonth))))).ToListAsync();
        }

        public async Task<Expense> GetExpenseByMonthAsync(DateDto date)
        {
            return await dbContext.Expense.Where(x=>x.Year == date.Year && x.Month == date.Month).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<Expense>> GetAllExpense()
        {
            return await dbContext.Expense.ToListAsync();
        }

        public async Task<Expense> IsExist(int year,int month)
        {
           var expense = await dbContext.Expense.Where(x => x.Year == year && x.Month == month).SingleOrDefaultAsync();
           return expense;
        }

        private async Task<bool> SaveChangesAsync()
        {
            return (await dbContext.SaveChangesAsync() > 0);
        }
    }
}
