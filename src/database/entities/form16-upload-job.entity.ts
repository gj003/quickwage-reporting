import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { CompanyEntity } from './company.entity';
import { LegalEntity } from './legal_entity.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'form16_upload_jobs' })
@Index('idx_form16_upload_jobs_company_status', ['company_id', 'status'])
export class Form16UploadJobEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'form16_upload_job_id' })
  form16_upload_job_id: string;

  @Column({ type: 'uuid' }) company_id: string;
  @Column({ type: 'uuid' }) requested_by: string;
  @Column({ type: 'uuid' }) legal_entity_id: string;
  @Column({ type: 'varchar', length: 20 }) financial_year: string;
  @Column({ type: 'varchar', length: 10 }) part: string;
  @Column({ type: 'text' }) source_s3_url: string;
  @Column({ type: 'varchar', length: 255 }) source_file_name: string;
  @Column({ type: 'varchar', length: 20, default: 'QUEUED' }) status: string;
  @Column({ type: 'integer', default: 0 }) total_files: number;
  @Column({ type: 'integer', default: 0 }) processed_files: number;
  @Column({ type: 'integer', default: 0 }) matched_files: number;
  @Column({ type: 'integer', default: 0 }) failed_files: number;
  @Column({ type: 'jsonb', nullable: true })
  result?: Record<string, unknown> | null;
  @Column({ type: 'text', nullable: true }) error_message?: string | null;
  @Column({ type: 'timestamptz', nullable: true }) queued_at?: Date | null;
  @Column({ type: 'timestamptz', nullable: true }) started_at?: Date | null;
  @Column({ type: 'timestamptz', nullable: true }) completed_at?: Date | null;

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @ManyToOne(() => LegalEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({
    name: 'legal_entity_id',
    referencedColumnName: 'legal_entity_id',
  })
  legal_entity: LegalEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'requested_by', referencedColumnName: 'user_id' })
  requester: UserEntity;
}
