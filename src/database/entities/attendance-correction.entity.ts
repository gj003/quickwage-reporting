// src/database/entities/attendance-correction.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { UserEntity } from './user.entity';
import { AttendanceCorrectionStatus } from 'src/common/enum';

@Entity('attendance_corrections')
export class AttendanceCorrectionEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'varchar', nullable: true })
  correction_type: string;

  @Column({ type: 'timestamp', nullable: true })
  corrected_checkIn: Date;

  @Column({ type: 'timestamp', nullable: true })
  corrected_checkOut: Date;

  @Column({ type: 'text', nullable: true })
  reason: string;

  @Column({ type: 'uuid', nullable: true })
  approver_manager_id: string;

  @Column({
    type: 'varchar',
    default: AttendanceCorrectionStatus.PENDING,
  })
  status: AttendanceCorrectionStatus;

  @Column({ type: 'text', nullable: true })
  approver_manager_remark: string;

  @Column({ type: 'timestamp', nullable: true })
  manager_action_time: Date;

  // relations

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'approver_manager_id', referencedColumnName: 'user_id' })
  approver_manager: UserEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: UserEntity;
}
