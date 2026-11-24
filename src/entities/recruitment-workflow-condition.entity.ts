import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { RecruitmentWorkflowEntity } from './recruitment-workflow.entity';

@Entity({ name: 'recruitment_workflow_conditions' })
export class RecruitmentWorkflowConditionEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'recruitment_workflow_condition_id' })
  recruitment_workflow_condition_id: string;

  @Column({ name: 'company_id', type: 'uuid' })
  company_id: string;

  @Column({ name: 'recruitment_workflow_id', type: 'uuid' })
  recruitment_workflow_id: string;

  @ManyToOne(
    () => RecruitmentWorkflowEntity,
    (workflow) => workflow.conditions,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'recruitment_workflow_id' })
  workflow: RecruitmentWorkflowEntity;

  @Column({ name: 'condition_type', type: 'varchar', length: 60 })
  condition_type: string;

  @Column({ name: 'operator', type: 'varchar', length: 40 })
  operator: string;

  @Column({ name: 'condition_value', type: 'jsonb' })
  condition_value: Record<string, unknown>;

  @Column({ name: 'sequence', type: 'int', default: 1 })
  sequence: number;
}
