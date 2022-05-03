class Aufgabe{
    public aufgabe:string;
    constructor(new_aufgabe:string){
        this.aufgabe=new_aufgabe;
    }
}

let inputAufgabe: JQuery;
let formInput: JQuery;
const aufgaben:Array<Aufgabe>= new Array<Aufgabe>();

$(() => {
    inputAufgabe = $("#inputAufgabe");
    formInput = $("#formInput");

    formInput.on("submit", erstelleAufgabe);

});

function erstelleAufgabe(): void {
    const aufgabe: string = inputAufgabe.val().toString();
    //alert(aufgabe);

    $.ajax("/aufgabe", {
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            aufgabe: aufgabe
        })
    }).then((data) => {
        alert(data);
    }).catch((jqXHR: JQueryXHR) => {
        alert(jqXHR.responseText);
    });
}
