import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('attendance_shift_rotation_employee_allocations')
export class AttendanceShiftRotationEmployeeAllocationEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  attendance_shift_rotation_employee_allocation_id: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column({ type: 'uuid' })
  attendance_shift_rotation_id: string;

  @Column({ type: 'uuid', nullable: true })
  attendance_shift_rotation_team_id?: string | null;

  @Column({ type: 'uuid' })
  employee_id: string;

  @Column({ type: 'date' })
  effective_date: string;

  @Column({ type: 'varchar', length: 40, default: 'ACTIVE' })
  allocation_status: string;

  @Column({ type: 'uuid', nullable: true })
  moved_from_rotation_id?: string | null;

  @Column({ type: 'uuid', nullable: true })
  moved_from_team_id?: string | null;

  @Column({ type: 'uuid', nullable: true })
  created_by?: string | null;
}
