import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('attendance_shift_day_timings')
export class AttendanceShiftDayTimingEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  attendance_shift_day_timing_id: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column({ type: 'uuid' })
  attendance_shift_version_id: string;

  @Column({ type: 'varchar', length: 20 })
  day_of_week: string;

  @Column({ type: 'int' })
  instance_index: number;

  @Column({ type: 'varchar', length: 5 })
  start_time: string;

  @Column({ type: 'varchar', length: 5 })
  end_time: string;

  @Column({ type: 'int', default: 0 })
  break_minutes: number;

  @Column({ type: 'int' })
  duration_minutes: number;
}
