
let todoList: any [] = [
    {
        id: 1,
        title: 'Todo 1',
        date: '2020-01-01',
        completed: false
    },
    {
        id: 2,
        title: 'Todo 2',
        date: '2020-01-01',
        completed: false
    },
    {
        id: 3,
        title: 'Todo 3',
        date: '2020-01-01',
        completed: false
    }
];

//get todos from server
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
    }).then(() => {});
}

//render all todos as cards
function renderTodos (todoList: any[]) {
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

