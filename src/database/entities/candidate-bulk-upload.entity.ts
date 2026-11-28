import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';
import { CandidateBulkUploadRowEntity } from './candidate-bulk-upload-row.entity';

@Entity('candidate_bulk_uploads')
@Index('idx_candidate_bulk_upload_company_status', ['company_id', 'status'])
@Index(
  'uq_candidate_bulk_upload_idempotency',
  ['company_id', 'idempotency_key'],
  { unique: true, where: 'idempotency_key IS NOT NULL AND deleted_at IS NULL' },
)
export class CandidateBulkUploadEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'candidate_bulk_upload_id' })
  candidate_bulk_upload_id: string;
  @Column({ type: 'uuid' }) company_id: string;
  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;
  @Column({ type: 'varchar', length: 30, default: 'QUEUED' }) status: string;
  @Column({ type: 'varchar', length: 255 }) original_name: string;
  @Column({ type: 'text' }) archive_path: string;
  @Column({ type: 'uuid', nullable: true }) job_listing_id?: string | null;
  @Column({ type: 'varchar', length: 50 }) stage: string;
  @Column({ type: 'varchar', length: 150 }) source: string;
  @Column({ type: 'uuid', nullable: true }) sourced_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) candidate_owner?: string | null;
  @Column({ type: 'int', default: 0 }) total_files: number;
  @Column({ type: 'int', default: 0 }) parsed_files: number;
  @Column({ type: 'int', default: 0 }) parse_failures: number;
  @Column({ type: 'int', default: 0 }) validation_failures: number;
  @Column({ type: 'int', default: 0 }) possible_duplicates: number;
  @Column({ type: 'int', default: 0 }) ready_for_import: number;
  @Column({ type: 'text', nullable: true }) error_message?: string | null;
  @Column({ type: 'varchar', length: 200, nullable: true }) idempotency_key?:
    string | null;
  @Column({ type: 'varchar', length: 200, nullable: true })
  commit_idempotency_key?: string | null;
  @Column({ type: 'jsonb', nullable: true }) commit_result?: Record<
    string,
    unknown
  > | null;
  @OneToMany(() => CandidateBulkUploadRowEntity, (row) => row.upload)
  rows: CandidateBulkUploadRowEntity[];
}
