import { TestBed,inject } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import { TaskServiceService } from './task-service.service';

describe('TaskServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports:[HttpClientModule],
    providers: [TaskServiceService]
    });
  });

  it('should be created', () => {
    const service: TaskServiceService = TestBed.get(TaskServiceService);
    expect(service).toBeTruthy();
  });
});
