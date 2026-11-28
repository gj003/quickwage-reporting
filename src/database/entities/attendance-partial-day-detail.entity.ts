// src/database/entities/attendance-partial-day-detail.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { AttendanceRequestEntity } from './attendance-request.entity';
import { AttendancePartialDayType } from 'src/common/enum';

@Entity('attendance_partial_day_details')
export class AttendancePartialDayDetailEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  request_id: string;

  @Column({ type: 'varchar' })
  partial_day_type: AttendancePartialDayType;

  @Column({ type: 'int' })
  minutes: number;

  @Column({ type: 'text', nullable: true })
  note: string | null;

  @Column({ type: 'jsonb', nullable: true })
  notify_user_ids: string[] | null;

  // relations

  @OneToOne(
    () => AttendanceRequestEntity,
    (request) => request.partialDayDetail,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'request_id', referencedColumnName: 'request_id' })
  request: AttendanceRequestEntity;
}
