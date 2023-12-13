import Model, { MealTypeEnumType } from "../model.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { DailyReport } from "./dailyReport.entity";

//id is inherited from Model

@Entity("meals_")
export class Meals_ extends Model {
  @Column({
    name: "time",
  })
  time: string;

  @Column({
    name: "type",
    type: "enum",
    enum: MealTypeEnumType,
    default: MealTypeEnumType.ADDITIONAL,
  })
  type: MealTypeEnumType;

  @Column({
    name: "components",
  })
  components: string;

  @ManyToOne((type) => DailyReport, (dailyReport) => dailyReport.meals)
  dailyReport: DailyReport;
}
