import { Doctor } from "../doctor.entity";
import Model from "../model.entity";
import { Column, Entity, ManyToOne } from "typeorm";

//id is inherited from Model

@Entity()
export class Specializations extends Model {
  @Column()
  title: string;

  @ManyToOne(() => Doctor, (doc) => doc.specializations )
  doctor: Doctor
}
