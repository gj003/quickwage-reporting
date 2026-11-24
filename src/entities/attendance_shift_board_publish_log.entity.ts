import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('attendance_shift_board_publish_logs')
export class AttendanceShiftBoardPublishLogEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  attendance_shift_board_publish_log_id: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column({ type: 'uuid' })
  shift_board_id: string;

  @Column({ type: 'uuid' })
  published_by: string;

  @Column({ type: 'int', default: 0 })
  changes_applied_count: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  notes?: string | null;
}
