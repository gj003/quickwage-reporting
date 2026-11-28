import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('attendance_shift_rotations')
export class AttendanceShiftRotationEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  attendance_shift_rotation_id: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  shift_rotation_code: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description?: string | null;

  @Column({ type: 'int' })
  weeks_per_shift: number;

  @Column({ type: 'date' })
  rotation_start_date: string;

  @Column({ type: 'varchar', length: 40, default: 'ACTIVE' })
  status: string;

  @Column({ type: 'uuid', nullable: true })
  created_by?: string | null;

  @BeforeInsert()
  assignCode(): void {
    if (!this.shift_rotation_code) {
      this.shift_rotation_code = generatePrefixedCode('SHIFT_ROTATION');
    }
  }
}
