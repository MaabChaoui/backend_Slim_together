import { Column, Entity, ManyToOne, OneToOne } from "typeorm";
import Model from "./model.entity";
import { DailyReport } from "./PatientProfile/dailyReport.entity";
import { Supplements } from "./supplement.entity";

@Entity("recordsupplements")
export default class RecordSupplements extends Model {
  @ManyToOne((type) => DailyReport, (dr: DailyReport) => dr.recordSupplements, {
    cascade: true, // Enable cascade operations
    onDelete: "CASCADE", // Ensure deletion cascades to related meals
  })
  dailyReport: DailyReport;

  @OneToOne((type) => Supplements, (supp) => supp.record)
  supplement: Supplements;

  @Column({ name: "taken" })
  taken: Boolean;

  @Column({ name: "time" })
  time: string;
}
