import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { UserEntity } from './user.entity';
import { AttendanceEntity } from './attendance.entity';
import { ClockType } from 'src/common/enum';

@Entity('attendance_log')
export class AttendanceLogEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'timestamp' })
  clock_time: Date;

  @Column({ type: 'varchar', enum: ClockType })
  clock_type: ClockType;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  longitude: number;

  @Column({ type: 'text', nullable: true })
  selfie_s3_url?: string | null;

  @Column({ type: 'boolean', nullable: true })
  face_verified?: boolean | null;

  @Column({ type: 'decimal', precision: 8, scale: 4, nullable: true })
  face_confidence_score?: number | null;

  @Column({ type: 'decimal', precision: 12, scale: 8, nullable: true })
  face_match_distance?: number | null;

  @Column({ type: 'jsonb', nullable: true })
  geo_fence_metadata?: Record<string, unknown> | null;

  @Column({ type: 'integer', nullable: true })
  attendance_id: number;

  @ManyToOne(() => AttendanceEntity, (a) => a.logs, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'attendance_id' })
  attendance: AttendanceEntity;

  @ManyToOne(() => UserEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: UserEntity;
}
