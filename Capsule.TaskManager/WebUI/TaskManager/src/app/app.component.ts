import { Component, NgModule, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TaskServiceService } from './Services/task-service.service';
import { Http, Response } from '@angular/http';
import { PageService } from './Services/page-service';
import { AlertsModule } from 'angular-alert-module';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PageService]
})

@NgModule({
  declarations: [],
  imports: [],
  providers: [],
  
  bootstrap: [AppComponent]
})
export class AppComponent implements OnInit {  

constructor(private appServices:TaskServiceService, private pageService: PageService, private fb: FormBuilder) { }
    title = 'Task Manager';
    parentTaskList: any;
    taskDetails: any = [];
    pager: any = {};
    pagedItems: any = [];
    page: number;
    myForm: FormGroup;
     
  public ngOnInit() {     
    this.myForm = this.fb.group({
      TaskId: [''],
      Task: ['', Validators.required],
      Priority: [15, Validators.required],
      ParentId: ['', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: [''],
      IsActive: [''],
      ParentTask:['']
    });           
    this.appServices.getParentTask().subscribe(data => {     
      this.parentTaskList = data;
    });    
  }; 

  getTaskManager() {        
    this.appServices.getTaskManager().subscribe(data => {  
      this.taskDetails= data;   
      this.setPage(1);
    });
  };

  setPage(page: number) {    
    if (this.pager.totalPages != 0) {
      if (page < 1 || page > this.pager.totalPages) {
        return;
      }
    }
    // get pager object from service
    this.pager = this.pageService.getPager(this.taskDetails.length, page);
    // get current page of items
    this.pagedItems = this.taskDetails.slice(this.pager.startIndex, this.pager.endIndex + 1);
  };

  
}