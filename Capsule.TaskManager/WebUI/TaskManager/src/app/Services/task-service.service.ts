import { Component,NgModule, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

var serviceURL="http://localhost:100/";

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(public http: HttpClient) { }
  
  
  getParentTask()
  {    
    return this.http.get(serviceURL + "api/TaskManager/GetParentTask"); 
  }

  getTaskManager(){    
    return this.http.get(serviceURL + "api/TaskManager/ViewTask"); 
  }

  addTask(task){    
    return this.http.post(serviceURL + "api/TaskManager/AddTask",task); 
  }

  updateEditTask(task){    
    return this.http.post(serviceURL + "api/TaskManager/EditTask",task); 
  }
}
