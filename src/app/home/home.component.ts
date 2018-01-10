import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usedLibs: object[] = [];
  constructor() { }

  ngOnInit() {
    this.usedLibs.push(
      {'lib': 'Angular',
       'url' : 'https://github.com/angular/angular',
       'thumb': '/assets/angular.png',
       'desc': 'Framework for building client applications in HTML and TypeScript.'
       });

    this.usedLibs.push(
      {'lib': 'Material Design for Angular',
      'url':  'https://github.com/angular/material2',
      'thumb': '/assets/angular.png',
      'desc': 'Angular Material is a UI framework that provides a set of reusable and accessible UI components based on Material Design.'
      });

    this.usedLibs.push(
      {'lib': 'Angular Fire 2',
       'url': 'https://github.com/angular/angularfire2',
       'thumb': '/assets/firebase.png',
       'desc': 'The official Angular library for Firebase for performing realtime database operations and authentication.'
      });

    this.usedLibs.push(
      {'lib': 'Angular CLI',
       'url': 'https://github.com/angular/angular-cli',
      'thumb': '/assets/angularCli.png',
       'desc': 'Angular cli is a command line interface to scaffold and build angular apps using nodejs style (commonJs) modules.'
     });
  }

}
