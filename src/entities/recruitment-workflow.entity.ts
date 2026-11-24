import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { generatePrefixedCode } from 'src/common/utility';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { RecruitmentWorkflowActionEntity } from './recruitment-workflow-action.entity';
import { RecruitmentWorkflowConditionEntity } from './recruitment-workflow-condition.entity';
import { RecruitmentWorkflowJobEntity } from './recruitment-workflow-job.entity';
import { RecruitmentWorkflowTriggerEntity } from './recruitment-workflow-trigger.entity';

@Entity({ name: 'recruitment_workflows' })
@Index('idx_recruitment_workflow_company_status', ['company_id', 'status'])
@Index('idx_recruitment_workflow_company_scope', [
  'company_id',
  'workflow_scope',
])
export class RecruitmentWorkflowEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'recruitment_workflow_id' })
  recruitment_workflow_id: string;

  @Column({ name: 'auto_inc', type: 'int' })
  @Generated('increment')
  auto_inc: number;

  @Column({
    name: 'recruitment_workflow_code',
    type: 'varchar',
    length: 64,
    unique: true,
  })
  recruitment_workflow_code: string;

  @Column({ name: 'company_id', type: 'uuid' })
  company_id: string;

  @Column({ name: 'name', type: 'varchar', length: 160 })
  name: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  description?: string | null;

  @Column({ name: 'workflow_scope', type: 'varchar', length: 20 })
  workflow_scope: string;

  @Column({ name: 'status', type: 'varchar', length: 20, default: 'ACTIVE' })
  status: string;

  @Column({ name: 'all_jobs', type: 'boolean', default: true })
  all_jobs: boolean;

  @Column({ name: 'is_system_defined', type: 'boolean', default: false })
  is_system_defined: boolean;

  @Column({ name: 'is_template_based', type: 'boolean', default: false })
  is_template_based: boolean;

  @Column({
    name: 'recruitment_workflow_template_id',
    type: 'uuid',
    nullable: true,
  })
  recruitment_workflow_template_id?: string | null;

  @Column({ name: 'execution_order', type: 'int', default: 100 })
  execution_order: number;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  created_by?: string | null;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updated_by?: string | null;

  @OneToMany(
    () => RecruitmentWorkflowTriggerEntity,
    (trigger) => trigger.workflow,
  )
  triggers: RecruitmentWorkflowTriggerEntity[];

  @OneToMany(() => RecruitmentWorkflowActionEntity, (action) => action.workflow)
  actions: RecruitmentWorkflowActionEntity[];

  @OneToMany(
    () => RecruitmentWorkflowConditionEntity,
    (condition) => condition.workflow,
  )
  conditions: RecruitmentWorkflowConditionEntity[];

  @OneToMany(() => RecruitmentWorkflowJobEntity, (job) => job.workflow)
  jobs: RecruitmentWorkflowJobEntity[];

  @BeforeInsert()
  assignCode(): void {
    if (!this.recruitment_workflow_code)
      this.recruitment_workflow_code = generatePrefixedCode(
        'RECRUITMENT_WORKFLOW',
      );
  }
}
