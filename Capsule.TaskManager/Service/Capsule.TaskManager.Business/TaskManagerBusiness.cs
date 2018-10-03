using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Capsule.TaskManager.DataContract;
using Capsule.TaskManager.DataAccess;
namespace Capsule.TaskManager.Business
{
    public class TaskManagerBusiness : ITaskManagerBusiness
    {
        TaskManagerDataAccess taskManagerDataAccess = null;

        public TaskManagerBusiness()
        {
            taskManagerDataAccess = new TaskManagerDataAccess();
        }
        /// <summary>
        /// Get the all parent task details
        /// </summary>
        /// <returns></returns>
        public List<ParentTaskDetails> GetParentTask()
        {
            List<ParentTaskDetails> parentTaskList = taskManagerDataAccess.GetParentTaskRepository();
            return parentTaskList;
        }

        /// <summary>
        /// To get the task details by parent Id
        /// </summary>
        /// <returns></returns>
        public List<TaskModel> GetAllTask()
        {
            List<TaskModel> taskModel = taskManagerDataAccess.GetAllTaskRepository();
            return taskModel;
        }

        /// <summary>
        /// to save the task details
        /// </summary>
        /// <param name="taskModel"></param>
        /// <returns></returns>
        public int InsertTask(TaskModel taskModel)
        {
            int returnVal = 0;
            try
            {
                returnVal = taskManagerDataAccess.InsertTaskRepository(taskModel);
            }
            catch (Exception)
            {

                return returnVal;
            }
            return returnVal;
        }

        /// <summary>
        /// to Update the existing task details
        /// </summary>
        /// <param name="taskModel"></param>
        /// <returns></returns>
        public int UpdateTask(TaskModel taskModel)
        {
            int returnVal = 0;
            try
            {
                returnVal = taskManagerDataAccess.UpdateTaskRepository(taskModel);
            }
            catch (Exception)
            {

                return returnVal;
            }
            return returnVal;
        }
    }
}
