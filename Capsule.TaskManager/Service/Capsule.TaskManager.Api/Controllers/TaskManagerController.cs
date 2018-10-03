using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Capsule.TaskManager.DataContract;
using Capsule.TaskManager.Business;
using System.ComponentModel.DataAnnotations;
namespace Capsule.TaskManager.Api.Controllers
{
    public class TaskManagerController : ApiController
    {
        TaskManagerBusiness taskMgrBusiness;

        [HttpGet]
        [Route("api/TaskManager/GetParentTask")]
        public List<ParentTaskDetails> GetParentTask()
        {
            taskMgrBusiness = new TaskManagerBusiness();
            List<ParentTaskDetails> result = taskMgrBusiness.GetParentTask();
            return result;
        }

        [HttpGet]
        [Route("api/TaskManager/ViewTask")]
        public List<TaskModel> GetAllTask()
        {
            taskMgrBusiness = new TaskManagerBusiness();
            var result = taskMgrBusiness.GetAllTask();
            return result;
        }

        [HttpPost]
        [Route("api/TaskManager/AddTask")]
        public int InsertTaskDetails(TaskModel task)
        {
            int result = 0;
            if (ModelState.IsValid)
            {
                taskMgrBusiness = new TaskManagerBusiness();
                result = taskMgrBusiness.InsertTask(task);
            }
            return result;
        }

        [HttpPost]
        [Route("api/TaskManager/EditTask")]
        public int UpdateEndTask(TaskModel task)
        {
            int result = 0;
            
            if (ModelState.IsValid)
            {
                taskMgrBusiness = new TaskManagerBusiness();
                result = taskMgrBusiness.UpdateTask(task);
            }
            return result;
        }

    }
}
