import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { HiringStageEntity } from './hiring-stage.entity';
import { HiringAutomationRuleEntity } from './hiring-automation-rule.entity';
import { HiringFlowMetricEntity } from './hiring-flow-metric.entity';
import { JobRequisitionEntity } from './job-requisition.entity';
import { InterviewEntity } from './interview.entity';
import { CompanyEntity } from './company.entity';

@Entity({ name: 'hiring_flows' })
@Index('idx_hiring_flows_company_deleted', ['companyId', 'deleted_at'])
@Index('idx_hiring_flows_company_default_deleted', [
  'companyId',
  'isDefault',
  'deleted_at',
])
@Index('idx_hiring_flows_company_active_deleted', [
  'companyId',
  'isActive',
  'deleted_at',
])
@Index('idx_hiring_flows_company_name', ['companyId', 'name'])
@Index('uq_hiring_flows_company_code', ['companyId', 'flowCode'], {
  unique: true,
})
export class HiringFlowEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'hiring_flow_id' })
  hiringFlowId: string;

  @Column({ name: 'flow_code', type: 'varchar', length: 32, unique: true })
  flowCode: string;

  @Column({ name: 'org_id', type: 'uuid' })
  orgId: string;

  @Column({ name: 'company_id', type: 'uuid', nullable: true })
  companyId: string | null;

  @ManyToOne(() => CompanyEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @Column({ name: 'name', type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description?: string | null;

  @Column({ name: 'is_default', type: 'boolean', default: false })
  isDefault: boolean;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy?: string | null;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy?: string | null;

  @Column({ name: 'department', type: 'varchar', length: 150, nullable: true })
  department?: string | null;

  @Column({ name: 'job_level', type: 'varchar', length: 150, nullable: true })
  jobLevel?: string | null;

  @Column({ name: 'ai_optimization_enabled', type: 'boolean', default: false })
  aiOptimizationEnabled: boolean;

  @OneToMany(() => HiringStageEntity, (stage) => stage.flow, { cascade: false })
  stages: HiringStageEntity[];

  @OneToMany(() => HiringAutomationRuleEntity, (rule) => rule.flow, {
    cascade: false,
  })
  automationRules: HiringAutomationRuleEntity[];

  @OneToMany(() => HiringFlowMetricEntity, (metric) => metric.flow, {
    cascade: false,
  })
  metrics: HiringFlowMetricEntity[];

  @OneToMany(
    () => JobRequisitionEntity,
    (requisition) => requisition.hiringFlow,
    { cascade: false },
  )
  jobRequisitions: JobRequisitionEntity[];

  @OneToMany(() => InterviewEntity, (interview) => interview.flow, {
    cascade: false,
  })
  interviews: InterviewEntity[];

  @BeforeInsert()
  assignCode(): void {
    if (!this.flowCode) this.flowCode = generatePrefixedCode('HIRING_FLOW');
    if (!this.companyId && this.orgId) this.companyId = this.orgId;
  }
}
