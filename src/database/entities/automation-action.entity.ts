import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';

export type AutomationActionStatus = 'succeeded' | 'skipped' | 'failed';

@Entity({ name: 'automation_actions' })
export class AutomationActionEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('increment', { name: 'automation_action_id' })
  automationActionId: number;

  @Column({ name: 'rule_id', type: 'uuid', nullable: true })
  ruleId?: string | null;

  @Column({ name: 'subject_ref', type: 'varchar', length: 200 })
  subjectRef: string;

  @Column({ name: 'action', type: 'varchar', length: 100 })
  action: string;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 20,
    default: 'succeeded',
  })
  status: AutomationActionStatus;

  @Column({ name: 'detail', type: 'text', nullable: true })
  detail?: string | null;
}
