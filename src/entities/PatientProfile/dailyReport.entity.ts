import Model from "../model.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { User } from "../user.entity";
import { Doctor } from "../doctor.entity";
import { Meals_ } from "./meals.entity";
import RecordSupplements from "../recordSupplement.entity";

//id is inherited from Model

@Entity("dailyreport")
export class DailyReport extends Model {
  @Column({
    name: "wakeuptime",
  })
  wakeUpTime: string;

  @Column()
  sleepTime: string;

  @Column()
  screenTime: string;

  @Column()
  lastScreenTime: string;

  /* @Column()
  stepCount: string;

  @Column()
  exerciseDuration: string;

  @Column()
  exercises: string;
 */

  @Column()
  breathingSessionDuration: string;

  @Column()
  nightFasting: string;

  @ManyToOne((type) => User, (user) => user.dailyReports, {
    cascade: true, // Enable cascade operations
    onDelete: "CASCADE", // Ensure deletion cascades to related meals
  })
  user: User;

  @OneToMany((type) => Meals_, (meal) => meal.dailyReport)
  meals: Meals_[];

  @OneToMany((type) => RecordSupplements, (rc) => rc.dailyReport)
  recordSupplements: RecordSupplements[];
}
