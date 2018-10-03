using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace Capsule.TaskManager.DataContract
{
    public class TaskModel
    {
        [Required(ErrorMessage = "Parent Task is required")]
        public int ParentId { get; set; }
        public string ParentTask { get; set; }
        public int? TaskId { get; set; }

        [Required(ErrorMessage = "Task Name is required")]
        public string Task { get; set; }

        [Required(ErrorMessage = "Start Date is required")]
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? Priority { get; set; }
        public bool? IsActive { get; set; }
    }
}
