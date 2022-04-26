

function getTodos() {

    $.ajax({
        url: '/todos',
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            //renderTodos(response.todoList);
        },
        error: (jqXHRresponse) => {
            console.log(jqXHRresponse.responseJSON.message);
        },
    }).then(() => {
    });
}


function renderTodos () {
    //const festivalTableBody: JQuery = $('#alle_festivals');
    //const searchList: JQuery = $('#festival_search_list');
    // Delete the old table of users from the DOM
    
    for(const todo of todos) {

    }
}

//Main Callback
$(() => {
    getTodos();
});

