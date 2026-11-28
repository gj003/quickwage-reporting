import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { OrgDocumentFolderEntity } from './org-document-folder.entity';
import { OrgDocumentAccessLogEntity } from './org-document-access-log.entity';

@Entity('org_documents')
export class OrgDocumentEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'int' })
  folder_id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: true })
  allow_download: boolean;

  @Column({ type: 'boolean', default: false })
  acknowledgement_required: boolean;

  @Column({ type: 'boolean', default: false })
  block_portal_for_acknowledgement: boolean;

  @Column({ type: 'boolean', default: false })
  has_expiration: boolean;

  @Column({ type: 'date', nullable: true })
  expires_on: string;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  attachments: {
    key: string;
    original_name: string;
    mime_type: string;
    size: number;
  }[];

  @Column({ type: 'uuid' })
  uploaded_by: string;

  @ManyToOne(() => OrgDocumentFolderEntity, (f) => f.documents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'folder_id' })
  folder: OrgDocumentFolderEntity;

  @OneToMany(() => OrgDocumentAccessLogEntity, (log) => log.document)
  access_logs: OrgDocumentAccessLogEntity[];
}
