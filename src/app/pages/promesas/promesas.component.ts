import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css'],
})
export class PromesasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.getUsuarios().then((usuarios) => console.log(usuarios));
    // const promesas = new Promise((resolve, reject) => {
    //   if (false) {
    //     resolve('Hola mundo');
    //   } else {
    //     reject('Algo salió mal');
    //   }
    // });

    // promesas
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // console.log('fin init');
  }

  getUsuarios() {
    return new Promise((resolve) => {
      fetch('https://reqres.in/api/users')
        .then((resp) => resp.json()
        .then((body) => resolve(body.data))
      );
    });
  }
}
