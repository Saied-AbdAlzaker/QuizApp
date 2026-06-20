import { IQuizzes } from "../../instructor/modules/quizes/model/quizzes"

export interface IJoin {
    code: string
}
export interface IAllResults {
    quiz: IQuizzes,
    result:IResults
}

export interface IResults {
    _id: string,
    quiz: IQuiz
    participant: IParticipant
    score: number,
    started_at: string
}
export interface IQuiz {
    _id: string
    title: string
}

export interface IParticipant {
    _id: string,
    first_name: string,
    last_name: string,
    email: string
}
 export interface IAnswers {
    question: string,
    answer:string
 }
