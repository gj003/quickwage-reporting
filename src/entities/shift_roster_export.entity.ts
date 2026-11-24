import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('shift_roster_exports')
@Index('idx_shift_roster_export_org', ['organization_id', 'status'])
export class ShiftRosterExportEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  shift_roster_export_id: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  export_code: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'int' })
  month: number;

  @Column({ type: 'varchar', length: 10, default: 'csv' })
  format: string;

  @Column({ type: 'varchar', length: 20, default: 'PENDING' })
  status: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  file_url?: string | null;

  @BeforeInsert()
  assignCode(): void {
    if (!this.export_code) {
      this.export_code = generatePrefixedCode('SHIFT_ROSTER');
    }
  }
}
