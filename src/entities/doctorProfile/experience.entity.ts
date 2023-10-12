import { Doctor } from "../doctor.entity";
import Model from "../model.entity";
import { Column, Entity, ManyToOne } from "typeorm";

//id is inherited from Model

@Entity()
export class Experience extends Model {
  @Column()
  title: string;

  @Column()
  year: string;

  @ManyToOne(() => Doctor, (doc) => doc.experiences)
  doctor: Doctor;
}
