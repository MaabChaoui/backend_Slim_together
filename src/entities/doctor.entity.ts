import {
  Entity,
  Column,
  Index,
  BeforeInsert,
  OneToMany,
  BeforeUpdate,
} from "typeorm";
import Model from "./model.entity";
import { Education } from "./doctorProfile/education.entity";
import { Experience } from "./doctorProfile/experience.entity";
import { Services } from "./doctorProfile/services.entity";
import { Awards } from "./doctorProfile/awards.entity";
import { Specializations } from "./doctorProfile/specializations.entity";
import { GenderEnumType } from "./model.entity";

const bcrypt = require("bcrypt");

@Entity("doctor")
export class Doctor extends Model {
  @Column({ name: "fname" })
  fName: string;

  @Column({ name: "lname" })
  lName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  phone: string;

  @Column({
    name: "photourl",
    nullable: true,
    default: "https://i.stack.imgur.com/l60Hf.png",
  })
  photoURL: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: GenderEnumType,
    default: GenderEnumType.CHOOSE_GENDER,
  })
  gender: GenderEnumType;

  @Column({
    name: "dateofbirth",
    default: new Date("01-01-1980"),
  })
  DateOfBirth: Date;

  @Column()
  bio: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  wilaya: string;

  @Column()
  postcode: string;

  @OneToMany(() => Education, (ed) => ed.doctor)
  educations: Education[];

  @OneToMany(() => Experience, (ex) => ex.doctor)
  experiences: Experience[];

  @OneToMany(() => Services, (service) => service.doctor)
  services: Services[];

  @OneToMany(() => Awards, (award) => award.doctor)
  awards: Awards[];

  @OneToMany(() => Specializations, (sp) => sp.doctor)
  specializations: Specializations[];

  @Column({ name: "clinicname", nullable: true })
  clinicName: string;

  @Column({ name: "clinicaddress", nullable: true })
  clinicAddress: string;

  toJSON() {
    return { ...this, password: undefined };
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
