using ExpenseTracker.Models;
using ExpenseTracker.Models.Authentication;
using ExpenseTracker.Models.DTO;
using ExpenseTracker.Services;
using ExpenseTracker.Services.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccountBalanceTracker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Produces("application/json", Type = typeof(Task<IActionResult>))]
    public class ExpenseController : ControllerBase
    {
        private readonly ILoggerManager logger;
        private readonly IExpenseRepository expenseRepository;

        public ExpenseController(ILoggerManager logger,IExpenseRepository expenseRepository)
        {
            this.logger = logger;
            this.expenseRepository = expenseRepository;
        }


        [HttpPost]
        [Route("Create")]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> CreateExpense(CreateExpenseDto expenseDto)
        {

            var expense = new Expense
            {
                Year = expenseDto.Year,
                Month = expenseDto.Month,
                Research = expenseDto.Research,
                Canteen = expenseDto.Canteen,
                CarMaintenance = expenseDto.CarMaintenance,
                Marketing = expenseDto.CarMaintenance,
                ParkingFines = expenseDto.ParkingFines,
                CreatedBy = User.Identity.Name,
                CreatedDate = DateTime.Now,
            };

            var existingObject = await expenseRepository.IsExist(expenseDto.Year, expenseDto.Month);

            if (existingObject != null)
            {
                expense.ModifiedName = User.Identity.Name;
                expense.ModifiedDate = DateTime.Now;

                logger.Information("Started UpdateExpense ...");

                bool isSuccess = await expenseRepository.UpdateExpense(existingObject.Id, expense);

                if (isSuccess)
                {
                    logger.Information("Successfully Completed UpdateExpense ...");
                    return Ok();
                }
                else
                {
                    logger.Information("Error occured while updating expense");
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Expense updation failed! Please check expense details and try again." });
                }
            }
            else
            {
                logger.Information("Started CreateExpense ...");

                bool isSuccess = await expenseRepository.AddExpense(expense);

                if (isSuccess)
                {
                    logger.Information("Successfully Completed CreateExpense ...");
                    return Ok();
                }
                else
                {
                    logger.Information("Error occured while adding expense");
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Expense creation failed! Please check expense details and try again." });
                }
            }
        }



        [Route("GetByMonth")]
        [HttpPost]
        [Authorize(Roles = UserRoles.User)]
        public async Task<IActionResult> GetExpenseByDate(DateDto date)
        {

            logger.Information("Start GetExpenseByDate ...");

            var expense = await expenseRepository.GetExpenseByMonthAsync(date);

            string formattedDate = CommonMethods.GetFullName(expense.Month) + " " + expense.Year;
            
            GetExpenseDto expenseDto = new GetExpenseDto();

            expenseDto.ExpenseDate = formattedDate;
            expenseDto.Research = expense.Research;
            expenseDto.Canteen = expense.Canteen;
            expenseDto.CarMaintenance = expense.CarMaintenance;
            expenseDto.Marketing = expense.Marketing;
            expenseDto.ParkingFines = expense.ParkingFines;

            logger.Information("Successfully Completed GetExpenseByDate ...");

            return Ok(expenseDto);
        }

        [Route("GetAll")]
        [HttpGet]
        [Authorize(Roles = UserRoles.User)]
        public async Task<IActionResult> GetAllExpenses()
        {
            logger.Information("Started GetAllExpenses ...");

            var expenseList = await expenseRepository.GetAllExpense();

            var expenseDtoList = from e in expenseList
                                 select new GetExpenseDto()
                                 {
                                     ExpenseDate = CommonMethods.GetFullName(e.Month) + " " + e.Year,
                                     Research = e.Research,
                                     Canteen = e.Canteen,
                                     CarMaintenance = e.CarMaintenance,
                                     Marketing = e.Marketing,
                                     ParkingFines = e.ParkingFines
                                 };
            logger.Information("Successfully Completed GetAllExpenses ...");

            return Ok(expenseDtoList);
        }

        [Route("GetByPeriod")]
        [HttpPost]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> GetExpensesByDatePeriod(PeriodDto period)
        {
            logger.Information("Started GetExpensesByDatePeriod ...");

            var expenseList = await expenseRepository.GetExpensesByPeriodAsync(period);

            var expenseDtoList = from e in expenseList
                                 select new GetExpenseDto()
                                 {
                                     ExpenseDate= CommonMethods.GetFullName(e.Month) + " " +  e.Year,
                                     Research=e.Research,
                                     Canteen=e.Canteen,
                                     CarMaintenance=e.CarMaintenance,
                                     Marketing=e.Marketing,
                                     ParkingFines=e.ParkingFines
                                 };

            logger.Information("Successfully Completed GetExpensesByDatePeriod ...");

            return Ok(expenseDtoList);
        }
    }
}
