import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { generatePrefixedCode } from 'src/common/utility';
import { BaseEntityColumns } from './base-entity-columns.entity';

@Entity({ name: 'recruitment_workflow_templates' })
export class RecruitmentWorkflowTemplateEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'recruitment_workflow_template_id' })
  recruitment_workflow_template_id: string;

  @Column({ name: 'auto_inc', type: 'int' })
  @Generated('increment')
  auto_inc: number;

  @Column({
    name: 'recruitment_workflow_template_code',
    type: 'varchar',
    length: 64,
    unique: true,
  })
  recruitment_workflow_template_code: string;

  @Column({ name: 'company_id', type: 'uuid', nullable: true })
  company_id?: string | null;

  @Column({ name: 'name', type: 'varchar', length: 160 })
  name: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  description?: string | null;

  @Column({ name: 'trigger_type', type: 'varchar', length: 60 })
  trigger_type: string;

  @Column({ name: 'workflow_scope', type: 'varchar', length: 20 })
  workflow_scope: string;

  @Column({ name: 'template_config', type: 'jsonb' })
  template_config: Record<string, unknown>;

  @Column({ name: 'is_system_template', type: 'boolean', default: true })
  is_system_template: boolean;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  is_active: boolean;

  @Column({ name: 'display_order', type: 'int', default: 1 })
  display_order: number;

  @BeforeInsert()
  assignCode(): void {
    if (!this.recruitment_workflow_template_code)
      this.recruitment_workflow_template_code =
        generatePrefixedCode('WORKFLOW_TEMPLATE');
  }
}
