import { Component,NgModule, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'; 
import { Http, Response } from '@angular/http';
import { TaskServiceService } from '../Services/task-service.service';
import { PageService } from '../Services/page-service';
import { AlertsModule } from 'angular-alert-module';
import Swal from 'sweetalert2';
import { observable } from 'rxjs/internal/symbol/observable';
import { Observable } from 'rxjs/internal/Observable';
import {  of } from 'rxjs';
import {  AppComponent } from '../app.component';
import { AddTaskComponent } from '../add-task/add-task.component';
declare var $: any;
@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
  providers:[PageService]
})

@NgModule({
  declarations: [],
  imports: [],
  providers: [],
  bootstrap: [ViewTaskComponent]
})

export class ViewTaskComponent implements OnInit {

 constructor(private appServices:TaskServiceService, private pageService: PageService, private fb: FormBuilder,public appCom :AppComponent) { }   
  title = 'Task Manager';
    parentTaskList: any;
    taskDetails: any = [];   
    search: any = {
    taskSearch: '',
    parentTaskSearch: '',
    priorityFromSearch: '',
    priorityToSearch: '',
    startDateSearch: '',
    endDateSearch: ''
  }  
  submitted: boolean = false; 
  public ngOnInit() {        
    this.appCom.getTaskManager();       
  }

   public EditTask(task) {     
    $('.task-manager-page a[href="#addTask"]').tab('show');
    if (task.StartDate != null)
      task.StartDate = task.StartDate.slice(0, -9);
    if (task.EndDate != null)
      task.EndDate = task.EndDate.slice(0, -9);      
    this.appCom.myForm.setValue(task);
  };

  public EndTask(task) {    
    task.IsActive = false;
    this.appServices.updateEditTask(task).subscribe(data => {
    this.appCom.getTaskManager(); 
    Swal('success', `Data updated successfully...`, 'success');
    });
  }
}