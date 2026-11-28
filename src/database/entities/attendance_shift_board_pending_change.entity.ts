import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('attendance_shift_board_pending_changes')
export class AttendanceShiftBoardPendingChangeEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  attendance_shift_board_pending_change_id: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column({ type: 'uuid' })
  shift_board_id: string;

  @Column({ type: 'uuid' })
  employee_id: string;

  @Column({ type: 'varchar', length: 40 })
  change_type: string;

  @Column({ type: 'uuid', nullable: true })
  new_shift_id?: string | null;

  @Column({ type: 'uuid', nullable: true })
  new_shift_version_id?: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  new_weekly_off_code?: string | null;

  @Column({ type: 'date' })
  effective_date: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  note?: string | null;

  @Column({ type: 'varchar', length: 40, default: 'UI' })
  source: string;

  @Column({ type: 'varchar', length: 40, default: 'PENDING' })
  status: string;

  @Column({ type: 'uuid', nullable: true })
  created_by?: string | null;
}
