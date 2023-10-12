import { Doctor } from "../doctor.entity";
import Model from "../model.entity";
import { Column, Entity, ManyToOne } from "typeorm";

//id is inherited from Model

@Entity()
export class Education extends Model {
  @Column()
  title: string;

  @Column()
  desc: string;

  @Column()
  year: string;

  @ManyToOne((type) => Doctor, (doc) => doc.educations)
  doctor: Doctor;
}
