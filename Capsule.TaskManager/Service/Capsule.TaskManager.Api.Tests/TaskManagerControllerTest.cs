using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Capsule.TaskManager.Api.Controllers;
using Capsule.TaskManager.DataContract;
namespace Capsule.TaskManager.Api.Tests
{
    [TestClass]
    public class TaskManagerControllerTest
    {
        TaskManagerController taskManagerController;

        /// <summary>
        /// Get the parent task details
        /// </summary>
        [TestMethod]
        public void GetPatientTaskDetails_ShouldNotNull()
        {
            //Arrange
            taskManagerController = new TaskManagerController();

            //Act
            var parentTaskList = taskManagerController.GetParentTask();

            //Assert
            Assert.IsNotNull(parentTaskList);
            Assert.IsTrue(parentTaskList.Count > 0);
        }

        /// <summary>
        /// Get the all task details
        /// </summary>
        [TestMethod]
        public void GetAllTaskDetails_ShouldNotNull()
        {
            //Arrange
            taskManagerController = new TaskManagerController();

            //Act
            var taskList = taskManagerController.GetAllTask();

            //Assert
            Assert.IsNotNull(taskList);
            Assert.IsTrue(taskList.Count > 0);
        }

        /// <summary>
        /// Insert task details and get success
        /// </summary>
        [TestMethod]
        public void InsertTaskDetails_Successfully()
        {
            //Arrange
            taskManagerController = new TaskManagerController();
            TaskModel taskModel = new TaskModel
            {
                ParentId = 1,
                Task = "This is the Unit test task",
                StartDate = DateTime.Parse("26-09-2018"),
                EndDate = DateTime.Parse("10-10-2018"),
                Priority = 1,
                IsActive = true
            };
            //Act
            int returnVal = taskManagerController.InsertTaskDetails(taskModel);

            //Assert            
            Assert.IsNotNull(returnVal);
            Assert.AreEqual(1, returnVal);
        }

        /// <summary>
        /// Update task details and get success
        /// </summary>
        [TestMethod]
        public void UpdateTaskDetails_Successfully()
        {
            //Arrange
            taskManagerController = new TaskManagerController();
            TaskModel taskModel = new TaskModel
            {
                ParentId = 1,
                TaskId = 1,
                Task = "This is Updated test task",
                StartDate = DateTime.Parse("26-09-2018"),
                EndDate = DateTime.Parse("10-10-2018"),
                Priority = 1,
                IsActive = true
            };
            //Act
            int returnVal = taskManagerController.UpdateEndTask(taskModel);

            //Assert            
            Assert.IsNotNull(returnVal);
            Assert.AreEqual(1, returnVal);
        }
    }
}
