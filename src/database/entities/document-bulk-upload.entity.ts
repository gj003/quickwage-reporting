import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SharedEntity } from './shared.entity';
import { DocumentBulkUploadRowEntity } from './document-bulk-upload-row.entity';

export enum BulkUploadBatchStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

@Entity('document_bulk_uploads')
export class DocumentBulkUploadEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'varchar' })
  batch_name: string;

  @Column({ type: 'uuid' })
  uploaded_by: string;

  @Column({
    type: 'varchar',
    default: BulkUploadBatchStatus.PENDING,
  })
  status: BulkUploadBatchStatus;

  @Column({ type: 'varchar', default: 'list_of_folders' })
  upload_type: string;

  @Column({ type: 'simple-array', nullable: true })
  identifier_attributes: string[];

  @Column({ type: 'int', default: 0 })
  total_files: number;

  @Column({ type: 'int', default: 0 })
  successful_count: number;

  @Column({ type: 'int', default: 0 })
  error_count: number;

  @Column({ type: 'varchar', nullable: true })
  file_key: string;

  @OneToMany(() => DocumentBulkUploadRowEntity, (row) => row.batch)
  rows: DocumentBulkUploadRowEntity[];
}
