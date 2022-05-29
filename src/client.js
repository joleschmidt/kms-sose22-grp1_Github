function getTodos() {
    $.ajax({
        url: '/aufgaben',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            renderTodos(response.aufgaben);
        },
        error: function (jqXHRresponse) {
            console.log(jqXHRresponse.responseJSON.message);
        }
    });
}
function renderTodos(aufgaben) {
    console.log(aufgaben);
    console.log("fsafsafasf");
    var todoBody = $('#todo-body');
    todoBody.empty();
    for (var _i = 0, aufgaben_1 = aufgaben; _i < aufgaben_1.length; _i++) {
        var aufgabe = aufgaben_1[_i];
        var tableEntry = $("\n        <div class=\"card m-3 mt-3\" style=\"width: 18rem;\">\n        <div class=\"card-body\">\n        <h5 class=\"card-title aufgaben_name\">".concat(aufgabe.name, "</h5>\n            <h6 class=\"aufgaben_id\">ID: ").concat(aufgabe.aufgaben_id, "</h6>\n            <p class=\"card-text priority\">Priorit\u00E4t ").concat(aufgabe.prioritaet, "</p>\n            <p class=\"card-text\">").concat(aufgabe.time, "</p>\n            <a class=\"btn btn-secondary mr-2 aufgabeBearbeiten\">Edit</a>\n            <a class=\"btn btn-danger\">Delete</a>\n            </div>\n            </div>\n        "));
        todoBody.append(tableEntry);
    }
}
function renderModal(event) {
    var aufgaben_id = Number($(event.currentTarget).parent().children(".aufgaben_id").val());
    $.ajax("/aufgabe/:" + aufgaben_id, {
        method: "GET",
        contentType: "json"
    }).then(function (data) {
        $("#bearbeitenAufgabe").val(data.name);
        $("#bearbeitenPrio").val(data.prioritaet);
        $("#aufgabe-id-hidden").val(data.id);
    })["catch"](function (jqXHR) {
        console.log(jqXHR);
    });
}
function updateToDos(event) {
    var aufgaben_id = Number($("#aufgabe-id-hidden").val());
    var name = String($(".bearbeitenInput").val());
    var priority = Number($(".bearbeitenPrio").val());
    $.ajax("/aufgabe/:" + aufgaben_id, {
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify({
            name: name,
            priority: priority
        })
    }).then(function (data) {
        alert(data);
    })["catch"](function (jqXHR) {
        console.log(jqXHR.responseText);
    });
}
function createTask(inputAufgabe) {
    var aufgabe = inputAufgabe.val().toString();
    console.log(aufgabe);
    $.ajax("/aufgabe", {
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            aufgabe: aufgabe
        })
    }).then(function (data) {
        alert(data + "erfolgreich hinzugefügt!");
    })["catch"](function (jqXHR) {
        alert(jqXHR.responseText);
    });
}
//Main Callback
$(function () {
    $("#edit-modal").hide();
    $("#todo-body").on("click", '.aufgabeBearbeiten', function () {
        $("#edit-modal").show();
        renderModal(event);
    });
    $(".save").on("click", function () {
        $("#edit-modal").hide();
        updateToDos(event);
    });
    getTodos();
});
//Callback for Post
$(function () {
    var inputAufgabe = $("#inputAufgabe");
    var formInput = $("#formInput");
    formInput.on("submit", function () { createTask(inputAufgabe); });
});
//# sourceMappingURL=client.js.map