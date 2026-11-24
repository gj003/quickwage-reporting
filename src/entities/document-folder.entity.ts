import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SharedEntity } from './shared.entity';
import { DocumentTypeSettingEntity } from './document-type-setting.entity';

@Entity('document_folders')
export class DocumentFolderEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: false })
  is_system_defined: boolean;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  permissions: {
    role: string;
    view_documents: boolean;
    add_update_documents: boolean;
  }[];

  @OneToMany(() => DocumentTypeSettingEntity, (dt) => dt.folder)
  document_types: DocumentTypeSettingEntity[];
}
