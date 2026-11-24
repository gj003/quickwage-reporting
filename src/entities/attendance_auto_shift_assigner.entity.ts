import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('attendance_auto_shift_assigners')
export class AttendanceAutoShiftAssignerEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  attendance_auto_shift_assigner_id: string;

  @Column({ type: 'uuid', unique: true })
  organization_id: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description?: string | null;

  @Column({ type: 'uuid', nullable: true })
  default_attendance_shift_version_id?: string | null;

  @Column({ type: 'boolean', default: true })
  strict_full_coverage: boolean;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'uuid', nullable: true })
  created_by?: string | null;

  @BeforeInsert()
  assignCode(): void {
    if (!this.code) {
      this.code = generatePrefixedCode('AUTO_SHIFT');
    }
  }
}
