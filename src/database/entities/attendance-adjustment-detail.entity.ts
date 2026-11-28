// src/database/entities/attendance-adjustment-detail.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { AttendanceRequestEntity } from './attendance-request.entity';
import { AttendanceLogEntity } from './attendance-log.entity';

/**
 * old_value / new_value shape: { clock_type: ClockType, time: string } | null
 * - ADD:    old_value = null,            new_value = { clock_type, time }
 * - EDIT:   old_value = { ...original }, new_value = { ...requested }
 * - DELETE: old_value = { ...original }, new_value = null
 */
@Entity('attendance_adjustment_details')
export class AttendanceAdjustmentDetailEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  request_id: string;

  @Column({ type: 'integer', nullable: true })
  log_id: number | null;

  @Column({ type: 'jsonb', nullable: true })
  old_value: Record<string, unknown> | null;

  @Column({ type: 'jsonb', nullable: true })
  new_value: Record<string, unknown> | null;

  // relations

  @ManyToOne(
    () => AttendanceRequestEntity,
    (request) => request.adjustmentDetails,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'request_id', referencedColumnName: 'request_id' })
  request: AttendanceRequestEntity;

  @ManyToOne(() => AttendanceLogEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'log_id' })
  attendanceLog: AttendanceLogEntity | null;
}
