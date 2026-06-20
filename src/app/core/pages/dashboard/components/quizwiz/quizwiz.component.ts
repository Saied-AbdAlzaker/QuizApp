import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quizwiz',
  templateUrl: './quizwiz.component.html',
  styleUrls: ['./quizwiz.component.scss']
})
export class QuizwizComponent implements OnInit {
  receivedBoolean: boolean = true;

  constructor() { }

  handleBooleanChange(value: boolean) {
    this.receivedBoolean = value;
  }
  ngOnInit() {
  }
}
