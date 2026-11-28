import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('attendance_auto_shift_rules')
export class AttendanceAutoShiftRuleEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  attendance_auto_shift_rule_id: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column({ type: 'uuid' })
  attendance_auto_shift_assigner_id: string;

  @Column({ type: 'varchar', length: 5 })
  clock_in_start_time: string;

  @Column({ type: 'varchar', length: 5 })
  clock_in_end_time: string;

  @Column({ type: 'varchar', length: 5 })
  shift_start_time: string;

  @Column({ type: 'varchar', length: 5 })
  shift_end_time: string;

  @Column({ type: 'int', default: 0 })
  break_minutes: number;

  @Column({ type: 'int', nullable: true })
  max_slot_duration_minutes?: number | null;

  @Column({ type: 'int', default: 1 })
  sort_order: number;
}
