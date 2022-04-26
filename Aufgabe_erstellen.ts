class Aufgabe{
    public aufgabe:string;

    constructor(new_aufgabe:string){
        this.aufgabe=new_aufgabe;
    }
}

let inputAufgabe: JQuery;
let formAufgabe: JQuery;
const aufgaben:Array<Aufgabe>= new Array<Aufgabe>();

$(() => {
    inputAufgabe = $("#ainput");
    formAufgabe.on("aerstellen", aufgabeerstellen);
});


function aufgabeerstellen():void{
    const aufgabe:string=inputAufgabe.valueOf().toString();

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