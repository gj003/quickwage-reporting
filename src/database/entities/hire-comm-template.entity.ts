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

@Entity({ name: 'hire_comm_template' })
@Index('idx_hire_comm_template_company', ['companyId'])
@Index('uq_hire_comm_template_code', ['templateCode'], { unique: true })
export class HireCommTemplateEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'hire_comm_template_id' })
  hireCommTemplateId: string;

  @Column({ name: 'auto_inc', type: 'int' })
  @Generated('increment')
  autoInc: number;

  @Column({ name: 'template_code', type: 'varchar', unique: true })
  templateCode: string;

  @Column({ name: 'company_id', type: 'uuid' })
  companyId: string;

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  category: string;

  @Column({ type: 'varchar', length: 255 })
  subject: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ name: 'variables_json', type: 'text', nullable: true })
  variablesJson?: string | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'usage_count', type: 'int', default: 0 })
  usageCount: number;

  @Column({ name: 'scope', type: 'varchar', length: 16, default: 'SHARED' })
  scope: string;

  @Column({
    name: 'interview_type',
    type: 'varchar',
    length: 24,
    nullable: true,
  })
  interviewType?: string | null;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy?: string | null;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy?: string | null;

  @BeforeInsert()
  assignTemplateCode(): void {
    if (!this.templateCode) {
      this.templateCode = generatePrefixedCode('HCOMTPL');
    }
  }
}
