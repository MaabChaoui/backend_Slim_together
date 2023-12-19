import {
  Entity,
  Column,
  Index,
  BeforeInsert,
  AfterInsert,
  BeforeUpdate,
  OneToMany,
} from "typeorm";
import Model, { MaritalStatusEnumType, GenderEnumType } from "./model.entity";
import { DailyReport } from "./PatientProfile/dailyReport.entity";
import { Supplements } from "./supplement.entity";

const bcrypt = require("bcrypt");

@Entity("users")
export class User extends Model {
  @Column({ name: "fname" })
  fName: string;

  @Column({ name: "lname" })
  lName: string;

  @Index("email_index")
  @Column({
    unique: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  phone: string;

  @Column({
    nullable: true,
  })
  address: string;

  @Column({
    name: "dateofbirth",
    default: new Date("01-01-1980"),
  })
  dateOfBirth: Date;

  @Column({
    name: "photourl",
    nullable: true,
    default: "https://i.stack.imgur.com/l60Hf.png",
  })
  photoURL: string;

  @Column()
  password: string;

  /* @Column({
    default: "default.png",
  })
  photo: string; */

  @Column({
    type: "enum",
    enum: GenderEnumType,
    default: GenderEnumType.CHOOSE_GENDER,
  })
  gender: GenderEnumType;

  @Column({
    name: "maritalstatus",
    type: "enum",
    enum: MaritalStatusEnumType,
    default: MaritalStatusEnumType.NOT_MARRIED,
  })
  maritalStatus: MaritalStatusEnumType;

  @Column({ nullable: true })
  height: number; //cm, 80 <= height <= 220

  @Column({ nullable: true })
  weight: number;

  @Column({
    name: "waistmeasurements",
    nullable: true,
  })
  waistMeasurements: string;

  @Column({
    name: "hipmeasurements",
    nullable: true,
  })
  hipMeasurements: string;

  @Column({ nullable: true })
  illnesses: string;

  @Column({
    name: "sleepingproblems",
    nullable: true,
  })
  sleepingProblems: string;

  @Column({
    name: "parentsillness",
    nullable: true,
  })
  parentsIllness: boolean;

  // plan?????????????????????
  @Column()
  plan: string;

  @Column({
    name: "parentsillnessdescription",
    nullable: true,
  })
  parentsIllnessDescription: string;

  @OneToMany(() => DailyReport, (dailyReport) => dailyReport.user)
  dailyReports: DailyReport[];

  @OneToMany(() => Supplements, (supplement) => supplement.user)
  supplements: Array<Supplements>;

  toJSON() {
    return { ...this, password: undefined, verified: undefined };
  }

  // ? Hash password before saving to database
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  // ? Validate password
  static async comparePasswords(
    candidatePassword: string,
    hashedPassword: string
  ) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}
