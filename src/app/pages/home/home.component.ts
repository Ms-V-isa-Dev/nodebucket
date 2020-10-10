/**
 * Title: Nodebucket Capstone
 * Author: Verlee Washington
 * Date: 09/24/2020
 * Description: Home component ts
 */

import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../shared/task.service';
import { Item } from '../../shared/item.interface';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CookieService } from 'ngx-cookie-service';
import { Employee } from '../../shared/employee.interface';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from 'src/app/shared/create-task-dialog/create-task-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   // if you have an array of some type of object you should create arrays this way because you should always use the type
  todo: Item[];
  done: Item[];
  employee: Employee; // employee object to map to the interface

  empId: string;

  constructor(private taskService: TaskService, private cookieService: CookieService, private dialog: MatDialog) {

    this.empId = this.cookieService.get('session_user'); // get the active session user

    this.taskService.findAllTasks(this.empId).subscribe(res => {
      console.log(`--Server response from findAllTasks--`);
      console.log(res);

      this.employee = res.data; // mapping the employee object
      console.log(`--Employee object`);
      console.log(this.employee);

    }, err => {
      console.log(err);
    }, () => { // on complete
      this.todo = this.employee.todo; // returning a data object response from our api
      this.done = this.employee.done; // this is the best place to start mapping data

      console.log(`this is the complete function`);
      console.log(this.todo);
      console.log(this.done);
    })
   }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<any[]>) {

    if(event.previousContainer === event.container) { // if I reorder the previous container then do some code with that
      // to update the order of the array
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      console.log(`Reordered the existing list of task items`);

      this.updateTaskList(this.empId, this.todo, this.done);

    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

      console.log(`Moved task item to the container`);

      this.updateTaskList(this.empId, this.todo, this.done);
    }
  }

  private updateTaskList(empId: string, todo: Item[], done: Item[]): void {
    this.taskService.updateTask(empId, todo, done).subscribe(res => {
      this.employee = res.data;
    }, err => {
      console.log(err)
    }, () => {
      this.todo = this.employee.todo;
      this.done = this.employee.done;
    })
  }

  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.taskService.createTask(this.empId, data.text).subscribe(res => {
          this.employee = res.data;
        }, err => {
          console.log(err);
        }, () => {
          this.todo = this.employee.todo;
          this.done = this.employee.done;
        })
      }
    })
  }

  deleteTask(taskId: string) {
    if (taskId) {
      console.log(`Task item: ${taskId} was deleted`);

      this.taskService.deleteTask(this.empId, taskId).subscribe(res => {
        this.employee = res.data;
      }, err => {
        console.log(err);
      }, () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;
      })
    }
  }
}
