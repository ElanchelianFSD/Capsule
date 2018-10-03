using Capsule.TaskManager.DataContract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capsule.TaskManager.Business
{
    public interface ITaskManagerBusiness
    {
        List<ParentTaskDetails> GetParentTask();
        List<TaskModel> GetAllTask();
        int InsertTask(TaskModel taskModel);
        int UpdateTask(TaskModel taskModel);
    }
}
