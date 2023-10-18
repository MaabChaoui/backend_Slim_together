import Model from "../model.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { User } from "../user.entity";
import { Doctor } from "../doctor.entity";

//id is inherited from Model

@Entity("dailyreport")
export class DailyReport extends Model {
  @Column({
    name: "wakeuptime",
  })
  wakeUpTime: string;

  @Column()
  sleepTime:string;

  @Column()
  screenTime:string;

  @Column()
  lastScreenTime:string;

  @Column()
  stepCount:string;

  @Column()
  exerciseDuration:string;

  @Column()
  exercises:string;

  @Column()
  breathingSessionDuration:string;

  @Column()
  nightFasting:string;

  @ManyToOne((type) => User, (user) => user.dailyReports)
  user: User;
}
