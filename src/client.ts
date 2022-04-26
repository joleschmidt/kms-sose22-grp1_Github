
let todoList: any [] = [];


function getTodos() {

    $.ajax({
        url: '/todos',
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            renderTodos(response.todoList);
        },
        error: (jqXHRresponse) => {
            console.log(jqXHRresponse.responseJSON.message);
        },
    }).then(() => {
    });
}


function renderTodos () {
    const todoBody: JQuery = $('#todo-body');
    todoBody.empty();

    for(const todo of todoList) {
        const tableEntry: JQuery = $(`
        <div class="card m-3 mt-3" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">{todo.title}</h5>
            <p class="card-text">{todo.date}</p>
            <a class="btn btn-secondary mr-2">Edit</a>
            <a class="btn btn-danger">Delete</a>
            </div>
            </div>
        `);
        todoBody.append(tableEntry);
    }
}

//Main Callback
$(() => {
    getTodos();
});

