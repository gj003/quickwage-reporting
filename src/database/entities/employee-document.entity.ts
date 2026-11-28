import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { UserEntity } from './user.entity';

export enum EmployeeDocumentStatus {
  UNSUBMITTED = 0,
  PENDING = 1,
  VERIFIED = 2,
  REJECTED = 3,
}

export enum EmployeeDocumentType {
  CUSTOM = 0,
  IDENTITY = 1,
}

@Entity('employee_documents')
export class EmployeeDocumentEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  employee_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'varchar', nullable: true })
  document_type: string;

  @Column({ type: 'int', nullable: true })
  document_type_id: number;

  @Column({ type: 'boolean', default: false })
  document_type_is_global: boolean;

  @Column({ type: 'varchar', nullable: true })
  document_type_identifier: string;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  attachments: {
    sequenceFieldIdentifier: string | null;
    fileAttachmentId: string;
  }[];

  @Column({ type: 'boolean', default: false })
  mark_as_not_applicable: boolean;

  @Column({ type: 'int', default: EmployeeDocumentStatus.PENDING })
  status: EmployeeDocumentStatus;

  @Column({ type: 'int', default: EmployeeDocumentType.CUSTOM })
  employee_document_type: EmployeeDocumentType;

  @Column({ type: 'timestamptz', nullable: true })
  requested_on: Date;

  @Column({ type: 'timestamptz', nullable: true })
  submitted_on: Date;

  @Column({ type: 'varchar', nullable: true })
  expires_on: string;

  @Column({ type: 'varchar', nullable: true })
  linked_item_id: string;

  @Column({ type: 'boolean', default: false })
  is_expired: boolean;

  @Column({ type: 'uuid', nullable: true })
  verified_by: string;

  @Column({ type: 'boolean', default: false })
  has_expiry_date: boolean;

  @Column({ type: 'boolean', default: false })
  is_required: boolean;

  @Column({ type: 'jsonb', default: () => "'{}'" })
  attributes: Record<string, any>;

  @Column({ type: 'text', nullable: true })
  remarks: string;

  @Column({ type: 'boolean', default: true })
  can_download: boolean;

  @Column({ type: 'boolean', default: true })
  can_delete: boolean;

  @Column({ type: 'boolean', default: true })
  can_update: boolean;

  @Column({ type: 'int', default: 0 })
  source: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  country_code: string;

  @Column({ type: 'boolean', default: false })
  is_disabled: boolean;

  @Column({ type: 'boolean', default: false })
  is_confidential: boolean;

  @Column({ type: 'int', nullable: true })
  folder_id: number;

  @Column({ type: 'varchar', nullable: true })
  folder_name: string;

  // relations

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id', referencedColumnName: 'user_id' })
  employee: UserEntity;
}
