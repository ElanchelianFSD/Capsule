import { Component, NgModule, OnInit,Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TaskServiceService } from '../Services/task-service.service';
import { Http, Response } from '@angular/http';
import { PageService } from '../Services/page-service';
import { AlertsModule } from 'angular-alert-module';
import Swal from 'sweetalert2';
import { observable } from 'rxjs/internal/symbol/observable';
import { Observable } from 'rxjs/internal/Observable';
import {  of } from 'rxjs';
import {  AppComponent } from '../app.component';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers: [PageService]   
})


@NgModule({
  declarations: [],
  imports: [],
  providers: [],
  bootstrap: [AddTaskComponent]
})

export class AddTaskComponent implements OnInit {
 constructor(private appServices:TaskServiceService, private pageService: PageService, private fb: FormBuilder,public  appCom: AppComponent) { }
    title = 'Task Manager';    
    taskDetails: any = [];
    pager: any = {};
    pagedItems: any = [];
    page: number;
    response: any;
    search: any = {
    taskSearch: '',
    parentTaskSearch: '',
    priorityFromSearch: '',
    priorityToSearch: '',
    startDateSearch: '',
    endDateSearch: ''
   };
  myForm:FormGroup;
    submitted: boolean = false;
 
    public ngAfterContentInit() {

    }
  
  public ngOnInit() {     
      //this.myForm = this.appCom.myForm
  };

  public ResetTask() {
    this.appCom.myForm.reset();
    this.submitted = false;
  }

  compareTwoDates(data) {    
    if (data.EndDate != null && data.EndDate != '') {
      if (new Date(data.EndDate) < new Date(data.StartDate))
        return false;
      else
        return true;
    }
    else{
      return true;
    }
  }

  onSubmit()
  {
    this.submitted = true;           
    if(this.appCom.myForm.valid)
    {      
     if (this.compareTwoDates(this.appCom.myForm.value)) {          
       if(this.appCom.myForm.get('TaskId').value == '')
       {
          this.appServices.addTask(this.appCom.myForm.value).subscribe(data => {         
              if (data==1) {
                Swal('success', `Data Added successfully...`, 'success');
                this.appCom.myForm.reset();
                this.submitted = false;    
                this.appCom.getTaskManager();       
              }
              else {
                Swal('Failed', 'Please try again..', 'error');
              }
            },
            error => {              
              Swal('Failed', error.error.Message, 'error');
            }
          );
       }
       else{         
           this.appServices.updateEditTask(this.appCom.myForm.value).subscribe(data => {         
              if (data) {                        
                 Swal('success', `Data Updated successfully...`, 'success');
                this.appCom.myForm.reset();
                this.submitted = false;    
                this.appCom.getTaskManager();       
              }
              else {
                Swal('Failed', 'Please try again..', 'error');
              }
            },
            error => {              
              Swal('Failed', error.error.Message, 'error');
            }
           );          
       }
     } 
    }
    else
    {
     Swal('Failed','Please try again','error');
    }
  };
}
