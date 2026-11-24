import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('attendance_shift_rotation_shifts')
export class AttendanceShiftRotationShiftEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  attendance_shift_rotation_shift_id: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column({ type: 'uuid' })
  attendance_shift_rotation_id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  rotation_shift_code: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  icon?: string | null;

  @Column({ type: 'uuid' })
  linked_shift_id: string;

  @Column({ type: 'uuid', nullable: true })
  linked_shift_version_id?: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  weekly_off_code?: string | null;

  @Column({ type: 'int' })
  sequence_order: number;

  @BeforeInsert()
  assignCode(): void {
    if (!this.rotation_shift_code) {
      this.rotation_shift_code = generatePrefixedCode('ROT_SHIFT');
    }
  }
}
