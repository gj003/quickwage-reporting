import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('shift_import_batches')
@Index('idx_shift_import_org_status', ['organization_id', 'status'])
export class ShiftImportBatchEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  shift_import_batch_id: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  import_code: string;

  @Column({ type: 'varchar', length: 20, default: 'ASSIGNMENT' })
  import_type: string;

  @Column({ type: 'varchar', length: 20, default: 'PENDING' })
  status: string;

  @Column({ type: 'int', default: 0 })
  total_rows: number;

  @Column({ type: 'int', default: 0 })
  success_count: number;

  @Column({ type: 'int', default: 0 })
  failure_count: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  file_name?: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  started_at?: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  completed_at?: Date | null;

  @BeforeInsert()
  assignCode(): void {
    if (!this.import_code) {
      this.import_code = generatePrefixedCode('SHIFT_IMPORT');
    }
  }
}
