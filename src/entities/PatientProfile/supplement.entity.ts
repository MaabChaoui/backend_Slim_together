import Model from "../model.entity";
import { Column, Entity } from "typeorm";

//id is inherited from Model

@Entity()
export class Meals extends Model {}
