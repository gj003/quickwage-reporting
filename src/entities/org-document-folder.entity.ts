import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SharedEntity } from './shared.entity';
import { OrgDocumentEntity } from './org-document.entity';

@Entity('org_document_folders')
export class OrgDocumentFolderEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: false })
  is_private: boolean;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  legal_entity_ids: string[];

  @Column({ type: 'jsonb', default: () => "'[]'" })
  business_unit_ids: number[];

  @Column({ type: 'jsonb', default: () => "'[]'" })
  location_ids: number[];

  @Column({ type: 'jsonb', default: () => "'[]'" })
  department_ids: number[];

  @Column({ type: 'jsonb', default: () => "'[]'" })
  worker_type_ids: string[];

  @OneToMany(() => OrgDocumentEntity, (doc) => doc.folder)
  documents: OrgDocumentEntity[];
}
