import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IQuizzes } from '../model/quizzes';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

  constructor(private _HttpClient: HttpClient) { }

  getAllQuizze(): Observable<IQuizzes> {
    return this._HttpClient.get<IQuizzes>('quiz')
  }
  getQuizzeById(id: string): Observable<string> {
    return this._HttpClient.get<string>(`quiz/${id}`)
  }

  createQuizze(data: IQuizzes): Observable<IQuizzes> {
    return this._HttpClient.post<IQuizzes>('quiz', data)
  }
  updateQuizze(id: string, data: IQuizzes): Observable<IQuizzes> {
    return this._HttpClient.put<IQuizzes>(`quiz/${id}`, {"title":data})
  }
  deleteQuizze(id: string): Observable<string> {
    return this._HttpClient.delete<string>(`quiz/${id}`)
  }
  onGetFiveUpcommingQuizzes(): Observable<any> {
    return this._HttpClient.get('quiz/incomming');
  }
  onGetlastFiveCompeletedQuizzes(): Observable<any> {
    return this._HttpClient.get('quiz/completed');
  }
  onReassignQuiz(quizId:string,data: any): Observable<any> {
    return this._HttpClient.post(`quiz/reassign/${quizId}`, data);
  }

}
