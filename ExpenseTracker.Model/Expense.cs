
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ExpenseTracker.Models
{
    public class Expense
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [JsonPropertyName("Year")]
        public int Year { get; set; }

        [Required]
        [JsonPropertyName("Month")]
        [Range(1,12)]
        public int Month { get; set; }

        [Required]
        [Column(TypeName = "Money")]
        public decimal Research { get; set; }

        [Required]
        [Column(TypeName = "Money")]
        public decimal Canteen { get; set; }

        [Required]
        [Column(TypeName = "Money")]
        public decimal CarMaintenance { get; set; }

        [Required]
        [Column(TypeName = "Money")]
        public decimal Marketing { get; set; }

        [Required]
        [Column(TypeName = "Money")]
        public decimal ParkingFines { get; set; }

        public DateTime CreatedDate { get; set; }

        public string CreatedBy { get; set; }

        public DateTime ModifiedDate { get; set; }

        public string ModifiedName { get; set; }
    }
}
