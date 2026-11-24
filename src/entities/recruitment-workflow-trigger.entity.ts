import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { RecruitmentWorkflowEntity } from './recruitment-workflow.entity';

@Entity({ name: 'recruitment_workflow_triggers' })
export class RecruitmentWorkflowTriggerEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'recruitment_workflow_trigger_id' })
  recruitment_workflow_trigger_id: string;

  @Column({ name: 'company_id', type: 'uuid' })
  company_id: string;

  @Column({ name: 'recruitment_workflow_id', type: 'uuid' })
  recruitment_workflow_id: string;

  @ManyToOne(() => RecruitmentWorkflowEntity, (workflow) => workflow.triggers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'recruitment_workflow_id' })
  workflow: RecruitmentWorkflowEntity;

  @Column({ name: 'trigger_type', type: 'varchar', length: 60 })
  trigger_type: string;

  @Column({ name: 'trigger_config', type: 'jsonb', nullable: true })
  trigger_config?: Record<string, unknown> | null;

  @Column({ name: 'inactivity_value', type: 'int', nullable: true })
  inactivity_value?: number | null;

  @Column({
    name: 'inactivity_unit',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  inactivity_unit?: string | null;

  @Column({ name: 'from_stage_id', type: 'uuid', nullable: true })
  from_stage_id?: string | null;

  @Column({ name: 'to_stage_id', type: 'uuid', nullable: true })
  to_stage_id?: string | null;
}
