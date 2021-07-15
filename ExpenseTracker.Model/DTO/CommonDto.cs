using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.Json.Serialization;

namespace ExpenseTracker.Models.DTO
{
    public class CommonDto
    {
        [Required]
        [JsonPropertyName("Reserch")]
        public decimal Research { get; set; }

        [Required]
        [JsonPropertyName("Canteen")]
        public decimal Canteen { get; set; }

        [Required]
        [JsonPropertyName("Car")]
        public decimal CarMaintenance { get; set; }

        [Required]
        [JsonPropertyName("Marketing")]
        public decimal Marketing { get; set; }

        [Required]
        [JsonPropertyName("Parking")]
        public decimal ParkingFines { get; set; }
    }
}
