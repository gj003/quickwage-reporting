import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { CompanyEntity } from './company.entity';

@Entity({ name: 'post_exit_template' })
@Index('uq_post_exit_template_code', ['templateCode'], { unique: true })
export class PostExitTemplateEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'post_exit_template_id' })
  postExitTemplateId: string;

  @Column({ name: 'auto_inc', type: 'int' })
  @Generated('increment')
  autoInc: number;

  @Column({ name: 'template_code', type: 'varchar', unique: true })
  templateCode: string;

  @Column({ name: 'company_id', type: 'uuid', nullable: true })
  companyId?: string | null;

  @ManyToOne(() => CompanyEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company?: CompanyEntity | null;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  category: string;

  @Column({ type: 'varchar', length: 255 })
  subject: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'usage_count', type: 'int', default: 0 })
  usageCount: number;

  @Column({ name: 'variables_json', type: 'text', nullable: true })
  variablesJson?: string | null;

  @Column({ name: 'triggers_json', type: 'text', nullable: true })
  triggersJson?: string | null;

  @Column({ name: 'links_json', type: 'text', nullable: true })
  linksJson?: string | null;

  @BeforeInsert()
  assignTemplateCode(): void {
    if (!this.templateCode) {
      this.templateCode = generatePrefixedCode('PXTPL');
    }
  }
}
