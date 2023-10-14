import { Entity, Column, Index, BeforeInsert } from "typeorm";
import Model, {
  MaritalStatusEnumType,
  GenderEnumType,
  RoleEnumType,
} from "./model.entity";

const bcrypt = require("bcrypt");

@Entity("users")
export class User extends Model {
  @Column()
  fName: string;

  @Column()
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
    default: new Date("01-01-1980"),
  })
  dateOfBirth: Date;

  @Column({
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
  gender: GenderEnumType.CHOOSE_GENDER;

  @Column({
    type: "enum",
    enum: MaritalStatusEnumType,
    default: MaritalStatusEnumType.NOT_MARRIED,
  })
  maritalStatus: MaritalStatusEnumType.NOT_MARRIED;

  @Column({ nullable: true })
  height: number; //cm, 80 <= height <= 220

  @Column({ nullable: true })
  weight: number;

  @Column({ nullable: true })
  waistMeasurements: string;

  @Column({ nullable: true })
  hipMeasurements: string;

  @Column({ nullable: true })
  illnesses: string;

  @Column({ nullable: true })
  sleepingProblems: string;

  @Column({ nullable: true })
  parentsIlness: boolean;

  @Column({ nullable: true })
  parentsIllnessDescription: string;

  // plan?????????????????????
  @Column()
  plan: string;

  toJSON() {
    return { ...this, password: undefined, verified: undefined };
  }
  // ? Hash password before saving to database
  @BeforeInsert()
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
