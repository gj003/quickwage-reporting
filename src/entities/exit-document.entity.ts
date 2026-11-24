import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { ExitRequestEntity } from './exit-request.entity';

@Entity({ name: 'exit_document' })
@Index('idx_exit_document_request', ['exitRequestId'])
export class ExitDocumentEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'exit_document_id' })
  exitDocumentId: string;

  @Column({ name: 'exit_request_id', type: 'uuid' })
  exitRequestId: string;

  @Column({ name: 'doc_type', type: 'varchar', length: 50 })
  docType: string;

  @Column({ name: 'file_url', type: 'varchar', length: 1024 })
  fileUrl: string;

  @Column({ type: 'varchar', length: 30 })
  status: string;

  @Column({ name: 'uploaded_at', type: 'timestamptz', nullable: true })
  uploadedAt?: Date | null;

  @ManyToOne(() => ExitRequestEntity)
  @JoinColumn({
    name: 'exit_request_id',
    referencedColumnName: 'exitRequestId',
  })
  exitRequest: ExitRequestEntity;
}
