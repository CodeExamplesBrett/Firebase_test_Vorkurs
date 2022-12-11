import { Component } from '@angular/core';
import { Firestore, collectionData, collection, setDoc, doc, deleteDoc, docData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todos$: Observable<any>;
  todos:Array<any>;
  todoText = '';
  todoText2 = '';


  constructor(private firestore: Firestore) {

//CRUD = Create => addDoc, Read => docData, Update => setDoc, Delete => deleteDoc

    //get the entire collection
    const coll = collection(firestore, 'todos');
    //get the data out of the collection
    this.todos$ = collectionData(coll);
    console.log('raw', this.todos$)
    const docRef = doc(coll, 'NnCgZTDT7qOetxt1qdUJ');
    console.log('docref', docRef);
    //console.log('raw', this.todos$)
    // subscribe to the data... inside is a function that is called each time  , subscribe with newTodos as argument.. can be any name. Subscribe is used for Observables! because they change relularly.
    this.todos$.subscribe( (newTodos) => {
      console.log('New todos:', newTodos);
      //the data in this document is then assigned to a variable...
      this.todos = newTodos;
    });
  }

  addTodo(){
    //get the entire collection
    const coll = collection(this.firestore, 'todos');
    //add document to collection from the input text field for html [(ngModel)]="todoText"
    addDoc((coll), {name: this.todoText} );

  }

  addTodo2(){
    //get the entire collection
    const coll = collection(this.firestore, 'todos');
    const docRef = doc(coll, 'NnCgZTDT7qOetxt1qdUJ');
    const currentContent = docData(docRef)
    console.log('current', currentContent)
    setDoc(docRef, {currentContent, job: 'doctor'})
    //add document to collection from the input text field for html [(ngModel)]="todoText"
    //setDoc(coll, {test: 'test-data'});

  }

  deleteTodo(i){
    const coll = collection(this.firestore, 'todos');
    //const docRef = doc(coll, i);
    this.todos$ = collectionData(coll);
    console.log('selected', this.todos$)
    const docRef = doc(coll);
    console.log('all-ref', docRef)
    this.todos$.subscribe( (newTodos) => {
      console.log('our todos:', newTodos);
      //let ourTodo = newTodos[i];

      //console.log('our', ourTodo);
      //the data in this document is then assigned to a variable...
      //let ourTodo = newTodos[i]

    });


   // let ourTodo = 
   // const docRef = doc(coll, '');
   // deleteDoc(doc(coll, docRef.id ));
    
  }
  
}
