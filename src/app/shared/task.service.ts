/**
 * Title: Nodebucket Capstone
 * Author: Verlee Washington
 * Date: 10/10/2020
 * Description: Task services ts
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
    // get the logged in empId
    //this.baseUrl = 'http://localhost:3000'; // testing url for our api layer if not running npm run localhost
  }

/**
 * findAllTasks
 */
findAllTasks(empId: string): Observable<any> { // when function called it has to be in a return of the observable type
  return this.http.get('/api/employees/' + empId + '/tasks')
}

 /**
 * createTask
 */
createTask(empId: string, task: string): Observable<any> {
  return this.http.post('/api/employees/' + empId + '/tasks', {
  text: task
  })
}

 /**
 * updateTasks
 */
updateTask(empId: string, todo: Item[], done: Item[]): Observable<any> { //return an observable of any
  return this.http.put('/api/employees/' + empId + '/tasks', {
    todo,
    done
  })
}

 /**
 * deleteTasks
 */
deleteTask(empId: string, taskId: string): Observable<any> {
  return this.http.delete('/api/employees/' + empId + '/tasks/' + taskId)
  }
}
