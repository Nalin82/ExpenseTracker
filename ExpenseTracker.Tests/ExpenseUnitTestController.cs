
using ExpenseTracker.Services;
using ExpenseTracker.Services.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace ExpenseTracker.Tests
{
    public class ExpenseUnitTestController
    {
        private readonly ILoggerManager logger;
        private readonly IExpenseRepository expenseRepository;
        public ExpenseUnitTestController(ILoggerManager logger, IExpenseRepository expenseRepository)
        {
            this.logger = logger;
            this.expenseRepository = expenseRepository;
        }


    }
}
