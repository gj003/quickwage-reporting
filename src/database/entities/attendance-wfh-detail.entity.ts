// src/database/entities/attendance-wfh-detail.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { AttendanceRequestEntity } from './attendance-request.entity';
import { WfhPartialDayType } from 'src/common/enum';

@Entity('attendance_wfh_details')
export class AttendanceWfhDetailEntity extends SharedEntity {
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

  @Column({ type: 'boolean', default: false })
  is_half_day: boolean;

  @Column({ type: 'varchar', nullable: true })
  half_day_session:
    WfhPartialDayType.FIRST_HALF | WfhPartialDayType.SECOND_HALF | null;

  @Column({ type: 'boolean', default: false })
  is_hourly: boolean;

  @Column({ type: 'varchar', nullable: true })
  from_time: string | null;

  @Column({ type: 'varchar', nullable: true })
  to_time: string | null;

  @Column({ type: 'int', nullable: true })
  minutes: number | null;

  // relations

  @OneToOne(() => AttendanceRequestEntity, (request) => request.wfhDetail, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'request_id', referencedColumnName: 'request_id' })
  request: AttendanceRequestEntity;
}
