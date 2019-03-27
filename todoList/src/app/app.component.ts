import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface IPerson{
  name: string;
}
interface IToDo{
  desc: string;
  assign: string;
  done?: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public peopleList: IPerson[];
  public todoList: IToDo[];
  public undoneList: IToDo[];
  newDescription: string;
  newAssigne: string;

  
  constructor(private http: HttpClient){

  }

  async getAllPeople(){
    const people = await this.http.get<IPerson[]>('http://localhost:8081/api/people').toPromise();
    this.peopleList = people;
  }

  async getAllToDos(){
    const todos = await this.http.get<IToDo[]>('http://localhost:8081/api/todos').toPromise();
    this.todoList = todos;
  }

  getAllUndone(){
    this.todoList.forEach(element => {
      if(element.done){
        this.undoneList.push(element);
      }
    });
  }

  async saveToDo(){
    await this.http.post('http://localhost:8081/api/todos', {
      "description": this.newDescription,
      "assignedTo": this.newAssigne
    }).toPromise()
    this.getAllToDos();
  }
}