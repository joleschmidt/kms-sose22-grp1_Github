export class Aufgabe {
    public id: number;
    public name: string;
    public time: Date;
    public prioritaet: number;

    constructor(id: number, name: string, time: Date, prioritaet: number) {
        this.id = id;
        this.name = name;
        this.time = time;
        this.prioritaet = prioritaet;
    }
}
