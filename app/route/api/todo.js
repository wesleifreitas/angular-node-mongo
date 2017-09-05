var mongoose = require('mongoose');
var router = require('express').Router();
var Todo = mongoose.model('Todo');

function getTodos(res) {
    Todo.find(function(err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};

// api ---------------------------------------------------------------------
// get all todos
router.get('/todos', function(req, res) {
    // use mongoose to get all todos in the database
    getTodos(res);
});

// create todo and send back all todos after creation
router.post('/todos', function(req, res) {

    // create a todo, information comes from AJAX request from Angular
    Todo.create({
        text: req.body.text,
        done: false
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        getTodos(res);
    });

});

// delete a todo
router.delete('/todos/:todo_id', function(req, res) {
    Todo.remove({
        _id: req.params.todo_id
    }, function(err, todo) {
        if (err)
            res.send(err);

        getTodos(res);
    });
});

module.exports = router;