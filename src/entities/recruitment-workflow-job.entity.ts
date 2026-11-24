import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { RecruitmentWorkflowEntity } from './recruitment-workflow.entity';

@Entity({ name: 'recruitment_workflow_jobs' })
@Index(
  'uq_recruitment_workflow_job',
  ['company_id', 'recruitment_workflow_id', 'job_id'],
  { unique: true, where: '"deleted_at" IS NULL' },
)
export class RecruitmentWorkflowJobEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'recruitment_workflow_job_id' })
  recruitment_workflow_job_id: string;

  @Column({ name: 'company_id', type: 'uuid' })
  company_id: string;

  @Column({ name: 'recruitment_workflow_id', type: 'uuid' })
  recruitment_workflow_id: string;

  @ManyToOne(() => RecruitmentWorkflowEntity, (workflow) => workflow.jobs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'recruitment_workflow_id' })
  workflow: RecruitmentWorkflowEntity;

  @Column({ name: 'job_id', type: 'uuid' })
  job_id: string;
}
