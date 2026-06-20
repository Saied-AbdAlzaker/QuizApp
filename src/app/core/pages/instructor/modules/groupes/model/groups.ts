import { IStudents, Student } from "../../students/model/students";

export interface IGroup {
    _id: string,
    name: string,
    max_students: number,
    students: IStudents[],
}
export interface AddGroup {
    name: string,
    students: IStudents[]
}

export interface Group {
    name:string;
    instructor: string;
    max_students: number,
    status: string;
    students: Student[];
    _id: string;
    pageSize: number;
    pageNumber: number;
  }
  
//   export interface AddGroup {
//     name: string;
//     students: Student[];
//   }
