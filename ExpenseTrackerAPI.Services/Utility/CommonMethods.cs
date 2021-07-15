using System;
using System.Collections.Generic;
using System.Text;

namespace ExpenseTracker.Services.Utility
{
    public static class CommonMethods
    {
        public static string GetAbbreviatedName(int month)
        {
            DateTime date = new DateTime(2020, month, 1);

            return date.ToString("MMM");
        }

        // function to get the full month name
        public static string GetFullName(int month)
        {
            DateTime date = new DateTime(2020, month, 1);

            return date.ToString("MMMM");
        }

        public static int GetYear(string value)
        {
            DateTime date = Convert.ToDateTime(value);
            return date.Year;
        }

        public static int GetMonth(string value)
        {
            DateTime date = Convert.ToDateTime(value);
            return date.Month; 
        }
    }
}
