import { async, ComponentFixture, TestBed,inject } from '@angular/core/testing';

import { ViewTaskComponent } from './view-task.component';
import { Observable, of } from 'rxjs'
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing'
import { Component, NgModule, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule,ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TaskServiceService } from '../Services/task-service.service';
import { FilterPipe } from '../pipes/filter.pipe';
import { PageService } from '../Services/page-service';
import { AlertsModule } from 'angular-alert-module';
import Swal from 'sweetalert2';
import {  AppComponent } from '../app.component';

describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;
  let appcomponent: AppComponent;

  const parentTaskDetails: any = [
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
  

  let mockService = {
    getParentTask(): Observable<any> {
      return of(parentTaskDetails);      
    },

    getTaskManager(): Observable<any> {
      // return of(taskDetail);
      return;
    },

    submitTask(task): Observable<any> {
      // taskDetail.unshift(task);
      // return of(task);
      return;
    },

    updateEndTask(task): Observable<any> {
      // let idx = taskDetail.findIndex(x => x.Task_ID == task.Task_ID);
      // if (idx !== -1) {
      //   taskDetail[idx] = task;
      // }
      // return of(task);
      return;
    },
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
     declarations: [
        ViewTaskComponent,FilterPipe,AppComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule, RouterTestingModule, BrowserAnimationsModule, FormsModule, AlertsModule,ReactiveFormsModule],
      providers: [{ provide: TaskServiceService, useValue: mockService }, PageService]
    }).compileComponents();
  })); 

  it('should be should be get parentTask', inject([TaskServiceService], (service: TaskServiceService) => {
    spyOn(mockService, 'getParentTask').and.returnValue(mockService.getParentTask())
    // do stuff
    expect(mockService.getParentTask).toHaveBeenCalled();
  }));
});
