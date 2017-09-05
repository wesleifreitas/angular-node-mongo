(function() {
    'use strict';

    angular.module('myApp').controller('TodoCtrl', TodoCtrl);

    TodoCtrl.$inject = ['$scope', 'todoService'];

    function TodoCtrl($scope, todoService) {

        var vm = this;
        vm.formData = {};
        vm.loading = true;

        // GET =====================================================================
        // when landing on the page, get all todos and show them
        // use the service to get all the todos
        todoService.get()
            .then(function(data) {
                vm.todos = data;
                vm.loading = false;
            });

        // CREATE ==================================================================
        // when submitting the add form, send the text to the node API
        vm.createTodo = function() {

            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            if (vm.formData.text != undefined) {
                vm.loading = true;

                // call the create function from our service (returns a promise object)
                todoService.create(vm.formData)

                // if successful creation, call our get function to get all the new todos
                .then(function(data) {
                    vm.loading = false;
                    vm.formData = {}; // clear the form so our user is ready to enter another
                    vm.todos = data; // assign our new list of todos
                });
            }
        };

        // DELETE ==================================================================
        // delete a todo after checking it
        vm.removeTodo = function(id) {
            vm.loading = true;

            todoService.remove(id)
                // if successful creation, call our get function to get all the new todos
                .then(function(data) {
                    vm.loading = false;
                    vm.todos = data; // assign our new list of todos
                });
        };
    }
})();