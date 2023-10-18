import Model from "../model.entity";
import { Column, Entity } from "typeorm";

//id is inherited from Model

@Entity("meals_")
export class Meals_ extends Model {
  @Column({
    name:"time"
  })
  time: string;

  @Column({
    name:"components"
  })
  components: string
}
 