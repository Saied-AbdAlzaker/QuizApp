import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../service/student.service';
import { IAllResults } from '../../model/student';

@Component({
  selector: 'app-view-results',
  templateUrl: './view-results.component.html',
  styleUrls: ['./view-results.component.scss']
})
export class ViewResultsComponent implements OnInit{

  resultsInstructor: IAllResults | any;

  constructor(private _StudentService: StudentService,){}
  ngOnInit(): void {
    this.allResults()
  }

   allResults() {
    this._StudentService.getAllResults().subscribe({
      next: (res) => {
        console.log(res);
        this.resultsInstructor = res;

      }
    })
  }

}
