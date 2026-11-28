// src/database/entities/attandance.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Unique,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { UserEntity } from './user.entity';
import { AttendanceLogEntity } from './attendance-log.entity';
import { AttendanceStatus } from 'src/common/enum';

@Entity('attendance')
@Unique('UQ_attendance_user_date', ['user_id', 'attendance_date'])
export class AttendanceEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', nullable: true })
  checkIn: Date;

  @Column({ type: 'timestamp', nullable: true })
  checkOut: Date;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'date', nullable: true })
  attendance_date: Date;

  @Column({ type: 'integer', nullable: true })
  effective_hours: number;

  @Column({ type: 'integer', nullable: true })
  break_taken: number;

  @Column({ type: 'integer', nullable: true })
  gross_hours: number;

  @Column({ type: 'text', nullable: true, comment: 'User remark' })
  remark: string;

  @Column({ type: 'text', nullable: true })
  manager_description: string;

  @Column({ type: 'uuid', nullable: true })
  manager_id: string;

  @Column({ type: 'timestamp', nullable: true })
  action_time: Date;

  // ✅ New fields below

  @Column({
    type: 'varchar',
    default: AttendanceStatus.PENDING,
  })
  status: AttendanceStatus;

  @OneToMany(() => AttendanceLogEntity, (log) => log.attendance)
  logs: AttendanceLogEntity[];

  @ManyToOne(() => UserEntity, (user) => user.attendance, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'manager_id', referencedColumnName: 'user_id' })
  manager: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.attendance, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: UserEntity;
}
