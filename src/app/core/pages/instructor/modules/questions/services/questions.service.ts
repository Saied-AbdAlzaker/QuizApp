import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IQuestions } from '../model/questions';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

constructor(private _HttpClient:HttpClient) { }

getAllQuestions():Observable<any>
{
  return this._HttpClient.get('question')
}
getQuestionById(id:string):Observable<IQuestions>
{
  return this._HttpClient.get<IQuestions>(`question/${id}`)
}
addQuestion(data:IQuestions):Observable<IQuestions>
{
  return this._HttpClient.post<IQuestions>(`question`, data)
}
updateQuestion(data:IQuestions,id:string):Observable<IQuestions>
{
  return this._HttpClient.put<IQuestions>(`question/${id}`, data)
}
deleteQuestion(id:string):Observable<IQuestions>
{
  return this._HttpClient.delete<IQuestions>(`question/${id}`)
}
onSearchQuestion(difficulty:string,type:string):Observable<any>
{
  return this._HttpClient.post(`question/search?difficulty=${difficulty}&type=${type}`,{})
}

}
