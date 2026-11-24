import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('attendance_shift_versions')
export class AttendanceShiftVersionEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  attendance_shift_version_id: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column({ type: 'uuid' })
  shift_id: string;

  @Column({ type: 'int' })
  version_no: number;

  @Column({ type: 'date' })
  effective_from: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  change_note?: string | null;

  @Column({ type: 'uuid', nullable: true })
  created_by?: string | null;
}
