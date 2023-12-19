import { MealTypeEnumType } from "../entities/model.entity";

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IAddPatient {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  password: string;
  mobile?: string;
  address?: string;
  gender: "male" | "female";
  weight: number; //kgs
  height: number; //cm
  waist: number; //cm
  hip: number; //cm
  illnesses?: string;
  abdominalBloating?: string;
  sleepProblems?: string;
  //parents illnesses? (diabetes/heart/etc..)
  moreParentIlnesses?: string;
  //extras:
}

export interface ILoadMessages {
  roomID: string;
}

export interface IAddSupplements {
  names: string[];
}

export interface IMeal {
  time: string;
  type: MealTypeEnumType;
  components: string;
}

export interface ISupplement {
  id: string;
  created_at: Date;
  updated_at: Date;
  name: string;
}

export interface ISupplementRecord extends ISupplement {
  taken: Boolean;
  time: string;
}
