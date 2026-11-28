import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('shift_assignments')
@Index('idx_shift_assignment_employee_dates', [
  'organization_id',
  'employee_id',
  'start_date',
  'end_date',
])
export class ShiftAssignmentEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  shift_assignment_id: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  shift_assignment_code: string;

  @Column({ type: 'uuid' })
  employee_id: string;

  @Column({ type: 'uuid' })
  shift_id: string;

  @Column({ type: 'uuid', nullable: true })
  shift_board_id?: string | null;

  @Column({ type: 'uuid', nullable: true })
  location_id?: string | null;

  @Column({ type: 'date' })
  start_date: string;

  @Column({ type: 'date' })
  end_date: string;

  @Column({ type: 'varchar', length: 40, default: 'ACTIVE' })
  status: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  notes?: string | null;

  @BeforeInsert()
  assignCode(): void {
    if (!this.shift_assignment_code) {
      this.shift_assignment_code = generatePrefixedCode('SHIFT_ASSIGNMENT');
    }
  }
}
