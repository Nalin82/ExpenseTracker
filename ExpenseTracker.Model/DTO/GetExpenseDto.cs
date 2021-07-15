using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Text.Json.Serialization;

namespace ExpenseTracker.Models.DTO
{
    public class GetExpenseDto : CommonDto
    {

        [Required]
        [JsonPropertyName("AttachDate")]
        public string ExpenseDate { get; set; }
    }
}
