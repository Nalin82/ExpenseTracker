using ExpenseTracker.Models;
using ExpenseTracker.Models.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ExpenseTracker.Services
{
    public interface IExpenseRepository
    {
      
        Task<bool> AddExpense(Expense expense);

        Task<bool> UpdateExpense(int existingId, Expense expense);

        Task<Expense> IsExist(int year, int month);

        Task<Expense> GetExpenseByMonthAsync(DateDto date);

        Task<IEnumerable<Expense>> GetExpensesByPeriodAsync(PeriodDto dateRange);

        Task<IEnumerable<Expense>> GetAllExpense();
    }
}
