/**
 * Title: Nodebucket Capstone
 * Author: Verlee Washington
 * Date: 09/28/2020
 * Description: Employee-api js
 */

 const express = require('express');
 const Employee = require('../models/employee');// import over the employee route
 const errorM = require('../config/string-config');// import over the error message route
 const BaseResponse = require('../services/base-response');
 const ErrorResponse = require('../services/error-response');

 const router = express.Router();// import over the express router

 module.exports = router;


// do this if you have 1 api
// find employee by id
 router.get('/:empId', async(req, res) => {
   // use the mongoose employee model to query MongoDB Atlas by employee id
  try {

   // use employee model to query db to pull employee record to match route parameter
    Employee.findOne({'empId': req.params.empId}, 'empId todo done', function(err, employee) {

     // if there is a database level error, handle by the server 500 error
      if (err) {
        console.log(err);// returns the db only
        res.status(500).send({
       'message': errorM.errorM()
    })

   } else {
     // if there are no database level errors, return the employee object {}
     console.log(employee);
     res.json(employee);
   }
 })

  } catch (e) {
   console.log(e);
   res.status(500).send({
     'message': errorM.errorM()
   })
  }
})
 /**
  * API: findAllTasks
  * Returns a list of JSON task objects
  */
 router.get('/:empId/tasks', async(req, res) => {
   try {

     Employee.findOne({'empId': req.params.empId}, 'empId todo done', function(err, employee) {
       if (err) {
         console.log(err);

         const MongoDBErrorResponse = new ErrorResponse('500', 'Internal server error', err);
         res.status(500).send(MongoDBErrorResponse.toObject())

       } else {
         console.log(employee);

         const employeeTaskResponse = new BaseResponse('200', 'Query successful.', employee);
         res.json(employeeTaskResponse.toObject());
       }
     })

   } catch (e) {
    console.log(e);

    const errorCatchResponse = new ErrorResponse('500', 'Internal server error', e.message);
     res.status(500).send(errorCatchResponse.toObject())
   }
 })

 /**
  * API: createTask
  */
  router.post('/:empId/tasks', async(req, res) => {
    try {

      Employee.findOne({'empId': req.params.empId}, function(err, employee) {
        if (err) {
          console.log(err);

          const createTaskMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error.', err);
          res.status(500).send(createTaskMongoDbErrorResponse.toObject());

        } else {
          console.log(employee);

          // create a new item object
          const item = {
            text: req.body.text // from our schema
          };

          // push the new item to the todo array
          employee.todo.push(item);

          employee.save(function(err, updatedEmployee) {

            if (err) {
              console.log(err);

              const createTaskOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error.', err);
              res.status(500).send(createTaskOnSaveMongoDbErrorResponse.toObject());

            } else {
              console.log(updatedEmployee);

              const createTaskOnSaveSuccessResponse = new BaseResponse('200', 'Successful entry.', updatedEmployee);
              res.json(createTaskOnSaveSuccessResponse.toObject());
            }
          })
        }
      })

    } catch (e) {
      console.log(e);

      const createTaskCatchErrorResponse = new ErrorResponse('500', 'Internal server error.', e.message);
      res.status(500).send(createTaskCatchErrorResponse.toObject());
    }
  })


   /**
  * API: updateTask
  */
  router.put('/:empId/tasks', async(req, res) => {
    try{

      Employee.findOne({'empId': req.params.empId}, function(err, employee) {

        if (err) {
          console.log(err);

          const updateTaskMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error.', err);
          res.status(500).send(updateTaskMongoDbErrorResponse.toObject());

        } else {
          console.log(employee);

          employee.set({
            todo: req.body.todo,
            done: req.body.done
          });

          employee.save(function(err, updatedEmployee) {

            if (err) {
              console.log(err);

              const updateTaskOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
              res.status(500).send(updateTaskOnSaveMongoDbErrorResponse.toObject());

            } else {
              console.log(updatedEmployee);

              const updatedTaskOnSaveSuccessResponse = new BaseResponse('200', 'Update successful', updatedEmployee);
              res.json(updatedTaskOnSaveSuccessResponse.toObject());
            }
          })
        }
      })

    } catch (e) {
      console.log(e);

      const updateTaskCatchErrorResponse = new ErrorResponse('500', 'Internal server error.', e.message);
      res.status(500).send(updateTaskCatchErrorResponse.toObject());
    }
  })

   /**
  * API: deleteTask
  */
  router.delete('/:empId/tasks/:taskId', async(req, res) => {
    try {
      Employee.findOne({'empId': req.params.empId}, function(err, employee) {

        if (err) {
          console.log(err);

          const deleteTaskMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error.', err);
          res.status(500).send(deleteTaskMongoDbErrorResponse.toObject());

        } else {
          console.log(employee);

          const todoItem = employee.todo.find(item => item._id.toString() === req.params.taskId);
          const doneItem = employee.done.find(item => item._id.toString() === req.params.taskId);

          // validate if there is anything there.
          if (todoItem) {
            employee.todo.id(todoItem._id).remove();

            employee.save(function(err, updatedTodoItemEmployee) {
              if (err) {
              console.log(err);

              const deleteTodoItemOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error.', err);
              res.status(500).send(deleteTodoItemOnSaveMongoDbErrorResponse.toObject());

            } else {
              console.log(updatedTodoItemEmployee);

              const deleteTodoItemSuccessResponse = new BaseResponse('200', 'Removed item from todo list.', updatedTodoItemEmployee);
              res.json(deleteTodoItemSuccessResponse.toObject());
            }
          })

        } else if (doneItem) {
          employee.done.id(doneItem._id).remove();

          employee.save(function(err, updatedDoneItemEmployee) {

            if (err) {
              console.log(err);

              const deleteDoneItemOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error.', err);
              res.status(500).send(deleteDoneItemOnSaveMongoDbErrorResponse.toObject());

            } else {
              console.log(updatedDoneItemEmployee);

              const deleteDoneItemSuccessResponse = new BaseResponse('200', 'Removed item from the done list', updatedDoneItemEmployee);
              res.json(updatedDoneItemEmployee.toObject());
            }
          })

        } else {
          console.log('Invalid task Id.');

          const deleteTaskNotFoundResponse = new ErrorResponse('200', 'Unable to locate the requested task.', null);
          res.status(200).send(deleteTaskNotFoundResponse.toObject());
        }
      }
    })

    }catch (e) {
      console.log(e);

      const deleteTaskCatchErrorResponse = new ErrorResponse('500', 'Internal server error.', e.message);
      res.status(500).send(deleteTaskCatchErrorResponse.toObject());
    }
  })

 module.exports = router;
