import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CandidateBulkUploadEntity } from './candidate-bulk-upload.entity';

@Entity('candidate_bulk_upload_rows')
@Index('idx_candidate_bulk_row_upload_status', [
  'company_id',
  'candidate_bulk_upload_id',
  'status',
])
export class CandidateBulkUploadRowEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'candidate_bulk_upload_row_id' })
  candidate_bulk_upload_row_id: string;
  @Column({ type: 'uuid' }) company_id: string;
  @Column({ type: 'uuid' }) candidate_bulk_upload_id: string;
  @ManyToOne(() => CandidateBulkUploadEntity, (upload) => upload.rows, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'candidate_bulk_upload_id' })
  upload: CandidateBulkUploadEntity;
  @Column({ type: 'varchar', length: 255 }) file_name: string;
  @Column({ type: 'varchar', length: 30, default: 'PENDING' }) status: string;
  @Column({ type: 'jsonb', default: '{}' }) candidate_data: Record<
    string,
    unknown
  >;
  @Column({ type: 'jsonb', default: '[]' }) validation_errors: Array<
    Record<string, unknown>
  >;
  @Column({ type: 'jsonb', default: '[]' }) duplicate_candidates: Array<
    Record<string, unknown>
  >;
  @Column({ type: 'text', nullable: true }) failure_reason?: string | null;
  @Column({ type: 'uuid', nullable: true }) committed_candidate_id?:
    string | null;
}
