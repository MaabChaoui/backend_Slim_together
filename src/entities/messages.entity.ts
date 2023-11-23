import {
  Entity,
  Column,
  Index,
  BeforeInsert,
  OneToMany,
  BeforeUpdate,
} from "typeorm";
import Model from "./model.entity";

@Entity("messages")
export class messages extends Model {
  @Index("senderid_index")
  @Column({ name: "senderid" })
  senderID: string;

  @Column({ name: "recieverid" })
  recieverID: string;

  @Column({ name: "seen", default: false })
  seen: boolean;

  @Column({ name: "messagecontent", default: "" })
  messageContent: string;
}
