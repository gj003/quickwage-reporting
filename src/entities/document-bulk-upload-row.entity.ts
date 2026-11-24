import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { DocumentBulkUploadEntity } from './document-bulk-upload.entity';

export enum BulkUploadRowStatus {
  CLEAN = 'clean',
  ERROR = 'error',
  DISCARDED = 'discarded',
  IMPORTED = 'imported',
}

@Entity('document_bulk_upload_rows')
export class DocumentBulkUploadRowEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  batch_id: number;

  @Column({ type: 'uuid', nullable: true })
  employee_id: string;

  @Column({ type: 'varchar', nullable: true })
  employee_number: string;

  @Column({ type: 'varchar', nullable: true })
  employee_name: string;

  @Column({ type: 'varchar', nullable: true })
  attachment_key: string;

  @Column({ type: 'varchar', nullable: true })
  attachment_name: string;

  @Column({
    type: 'varchar',
    default: BulkUploadRowStatus.CLEAN,
  })
  status: BulkUploadRowStatus;

  @Column({ type: 'text', nullable: true })
  error_message: string;

  @Column({ type: 'int', nullable: true })
  folder_id: number;

  @Column({ type: 'varchar', nullable: true })
  folder_name: string;

  @ManyToOne(() => DocumentBulkUploadEntity, (batch) => batch.rows, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'batch_id' })
  batch: DocumentBulkUploadEntity;
}
