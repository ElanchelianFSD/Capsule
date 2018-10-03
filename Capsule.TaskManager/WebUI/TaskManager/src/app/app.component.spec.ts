import { TestBed, async, ComponentFixture, inject  } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component';
import { Component, NgModule, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule,ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TaskServiceService } from './Services/task-service.service';
import { FilterPipe } from './pipes/filter.pipe';
import { PageService } from './Services/page-service';
import { AlertsModule } from 'angular-alert-module';
import Swal from 'sweetalert2';
import { Observable, of } from 'rxjs';
import { AddTaskComponent } from '../app/add-task/add-task.component';
import { ViewTaskComponent } from '../app/view-task/view-task.component';


describe('AppComponent', () => {

  let component: AppComponent;
 
  let fixture: ComponentFixture<AppComponent>;

  const parentTaskDetail: any = [
   {
      "Parent_Task": "Parent Task 1",
      "Parent_ID": 1     
    },
    {
      "Parent_Task": "Parent Task 2",
      "Parent_ID": 2
     
    },
    {
     "Parent_Task": "Parent Task 3",
      "Parent_ID": 3
     
    }
  ];
  

  const taskDetail: any = [
    {
      "Task_ID": "1",
      "Parent_ID": 2,
      "Task": "Test task for parent 2",
      "Start_Date": "09/07/2018",
      "End_Date": "09/08/2018",
      "Priority": 40,
      "IsActive":true
    },
    {
      "Task_ID": "2",
      "Parent_ID": 1,
      "Task": "Test task for parent 1",
      "Start_Date": "09/07/2018",
      "End_Date": "09/08/2018",
      "Priority": 40,
      "IsActive":true
    },
    {
      "Task_ID": "3",
      "Parent_ID": 3,
      "Task": "Test task for parent 3",
      "Start_Date": "09/08/2018",
      "End_Date": "09/09/2018",
      "Priority": 60,
      "IsActive":true
    }
  ];


  let mockService = {
    getParentTask(): Observable<any> {
      return of(parentTaskDetail);
    },

    getTaskManager(): Observable<any> {
      return of(taskDetail);
    },

    submitTask(task): Observable<any> {
      taskDetail.unshift(task);
      return of(task);
    },

    updateEndTask(task): Observable<any> {
      let idx = taskDetail.findIndex(x => x.Task_ID == task.Task_ID);
      if (idx !== -1) {
        taskDetail[idx] = task;
      }
      return of(task);
    },
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, FilterPipe,
        AddTaskComponent,ViewTaskComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule, RouterTestingModule, BrowserAnimationsModule, FormsModule, AlertsModule,ReactiveFormsModule],
      providers: [{ provide: TaskServiceService, useValue: mockService }, PageService]
    }) .compileComponents();
  }));

  beforeEach(inject([FormBuilder], (fb: FormBuilder) => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance; 
    component.myForm = fb.group({
      TaskId: [''],
      Task: ['', Validators.required],
      Priority: [15, Validators.required],
      ParentId: ['', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: [''],
      IsActive: [''],
      ParentTask:['']
    });
    fixture.detectChanges();
  }));


  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    component.ngOnInit();
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  })); 
  it('should create a `FormGroup` comprised of `FormControl`s', () => {
        component.ngOnInit();
        expect(component.myForm instanceof FormGroup).toBe(true);
  });

  it('should be get', inject([TaskServiceService], (service: TaskServiceService) => {
    service.getParentTask().subscribe(data => {component.parentTaskList = data;});
    fixture.detectChanges();
    expect(service).toBeTruthy();
  }));
});
