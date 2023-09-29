export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {}

export interface IAddPatient {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email?: string;
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
