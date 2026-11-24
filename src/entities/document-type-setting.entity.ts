import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { DocumentFolderEntity } from './document-folder.entity';

export enum DocumentMultiplePolicy {
  SINGLE = 'single',
  MULTIPLE = 'multiple',
}

@Entity('document_type_settings')
export class DocumentTypeSettingEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'int' })
  folder_id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'varchar', default: DocumentMultiplePolicy.SINGLE })
  multiple_policy: DocumentMultiplePolicy;

  @Column({ type: 'boolean', default: false })
  is_mandatory: boolean;

  @Column({ type: 'boolean', default: false })
  employee_can_mark_na: boolean;

  @Column({ type: 'boolean', default: false })
  file_upload_optional: boolean;

  @Column({ type: 'boolean', default: false })
  verification_required: boolean;

  @Column({ type: 'boolean', default: false })
  ask_expiry_date: boolean;

  @Column({ type: 'boolean', default: false })
  all_countries: boolean;

  @Column({ type: 'simple-array', nullable: true })
  country_codes: string[];

  @Column({ type: 'jsonb', default: () => "'[]'" })
  form_fields: {
    name: string;
    field_type: string;
    values: string | null;
    is_mandatory: boolean;
  }[];

  @ManyToOne(() => DocumentFolderEntity, (f) => f.document_types, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'folder_id' })
  folder: DocumentFolderEntity;
}
