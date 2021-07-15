using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.Json.Serialization;

namespace ExpenseTracker.Models.DTO
{
    public class CreateExpenseDto : CommonDto
    {
        
        [Required]
        [JsonPropertyName("Year")]
  
        public int Year { get; set; }

        
        [Required]
        [JsonPropertyName("Month")]
        [Range(1, 12)]
        public int Month { get; set; }
    }
}
