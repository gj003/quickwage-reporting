import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('attendance_shift_board_employees')
export class AttendanceShiftBoardEmployeeEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  attendance_shift_board_employee_id: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column({ type: 'uuid' })
  shift_board_id: string;

  @Column({ type: 'uuid' })
  employee_id: string;

  @Column({ type: 'uuid', nullable: true })
  current_shift_id?: string | null;

  @Column({ type: 'uuid', nullable: true })
  current_shift_version_id?: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  current_weekly_off_code?: string | null;
}
