using System;
using System.Collections.Generic;
using System.Text;

namespace ExpenseTracker.Models.DTO
{
    public class PeriodDto
    {
        public int FromYear { get; set; }
        public int FromMonth { get; set; }
        public int ToYear { get; set; }
        public int ToMonth { get; set; }

    }
}
