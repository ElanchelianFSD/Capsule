using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Capsule.TaskManager.DataContract;
using Capsule.TaskManager.DataAccess.Entity;
namespace Capsule.TaskManager.DataAccess
{
    public class TaskManagerDataAccess : ITaskManagerDataAccess
    {
        /// <summary>
        /// To get the all parent task from database
        /// </summary>
        /// <returns></returns>
        public List<ParentTaskDetails> GetParentTaskRepository()
        {
            List<ParentTaskDetails> parentTaskDetails = null;
            using (TaskManagerApiEntities taskManagerEntity = new TaskManagerApiEntities())
            {
                parentTaskDetails = (from parentTask in taskManagerEntity.ParentTasks
                                     select new ParentTaskDetails
                                     {
                                         ParentId = parentTask.Parent_ID,
                                         Parent_Task = parentTask.Parent_Task
                                     }).ToList();
            }
            return parentTaskDetails;
        }



        public List<TaskModel> GetAllTaskRepository()
        {
            List<TaskModel> taskModel = null;
            using (TaskManagerApiEntities taskManagerEntity = new TaskManagerApiEntities())
            {
                taskModel = (from taskDts in taskManagerEntity.Tasks.Include("ParentTask")
                             orderby taskDts.Start_Date descending
                             select new TaskModel
                             {
                                 ParentId = taskDts.ParentTask.Parent_ID,
                                 ParentTask = taskDts.ParentTask.Parent_Task,
                                 TaskId = taskDts.Task_ID,
                                 Task = taskDts.Task1,
                                 StartDate = taskDts.Start_Date,
                                 EndDate = taskDts.End_Date,
                                 Priority = taskDts.Priority,
                                 IsActive = taskDts.IsActive
                             }).ToList();
            }
            return taskModel;
        }

        public int InsertTaskRepository(TaskModel taskModel)
        {
            int returnVal = 0;
            using (TaskManagerApiEntities taskManagerEntity = new TaskManagerApiEntities())
            {
                Task objtask = new Task();
                objtask.Task1 = taskModel.Task;
                objtask.Parent_ID = taskModel.ParentId;
                objtask.Start_Date = taskModel.StartDate;
                objtask.End_Date = taskModel.EndDate;
                objtask.IsActive = true;
                objtask.Priority = taskModel.Priority;
                taskManagerEntity.Tasks.Add(objtask);
                try
                {
                    returnVal = taskManagerEntity.SaveChanges();
                }
                catch (Exception ex)
                {
                    return returnVal;
                }

            }
            return returnVal;
        }

        public int UpdateTaskRepository(TaskModel taskModel)
        {
            int returnVal = 0;
            using (TaskManagerApiEntities taskManagerEntity = new TaskManagerApiEntities())
            {
                Task objtask = taskManagerEntity.Tasks.Where(x => x.Task_ID == taskModel.TaskId).FirstOrDefault();
                if (objtask != null)
                {
                    objtask.Task1 = taskModel.Task;
                    objtask.Parent_ID = taskModel.ParentId;
                    objtask.Start_Date = taskModel.StartDate;
                    objtask.End_Date = taskModel.EndDate;
                    objtask.IsActive = taskModel.IsActive;
                    objtask.Priority = taskModel.Priority;                    
                    try
                    {
                        taskManagerEntity.SaveChanges();
                        returnVal = 1;
                    }
                    catch (Exception ex)
                    {
                        return returnVal;
                    }
                }

            }
            return returnVal;
        }
    }
}
