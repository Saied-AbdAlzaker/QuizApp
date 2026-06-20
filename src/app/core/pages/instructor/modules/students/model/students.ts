import { Group } from "../../groupes/model/groups"

export interface IStudents {
    _id: string,
    first_name: string,
    last_name: string,
    email: string,
    status: string,
    role: string,
    group: IStudentsGroups,
    length: number,
    avg_score: number
}

export interface IStudentsGroups {
    _id: any,
    instructor: string,
    max_students: number,
    name: string,
    status: string,
    updatedAt: string,
    createdAt: string
    length: number
}

export interface Student {
    email: string,
    first_name: string,
    last_name: string,
    role: "Student",
    status: string,
    _id: string,
    group: Group[],
  }
