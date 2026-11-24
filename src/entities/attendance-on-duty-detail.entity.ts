// src/database/entities/attendance-on-duty-detail.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { AttendanceRequestEntity } from './attendance-request.entity';

@Entity('attendance_on_duty_details')
export class AttendanceOnDutyDetailEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  request_id: string;

  @Column({ type: 'date' })
  from_date: Date;

  @Column({ type: 'date' })
  to_date: Date;

  @Column({ type: 'text', nullable: true })
  note: string | null;

  @Column({ type: 'jsonb', nullable: true })
  notify_user_ids: string[] | null;

  // relations

  @OneToOne(() => AttendanceRequestEntity, (request) => request.onDutyDetail, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'request_id', referencedColumnName: 'request_id' })
  request: AttendanceRequestEntity;
}
