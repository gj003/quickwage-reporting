import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { HiringFlowEntity } from './hiring-flow.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'hiring_automation_rules' })
export class HiringAutomationRuleEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'hiring_automation_rule_id' })
  hiringAutomationRuleId: string;

  @Column({ name: 'rule_code', type: 'varchar', length: 32, unique: true })
  ruleCode: string;

  @Column({ name: 'flow_id', type: 'uuid' })
  flowId: string;

  @ManyToOne(() => HiringFlowEntity, (flow) => flow.automationRules, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'flow_id', referencedColumnName: 'hiringFlowId' })
  flow: HiringFlowEntity;

  @Column({ name: 'kind', type: 'varchar', length: 50 })
  kind: string;

  @Column({ name: 'criteria_json', type: 'text', nullable: true })
  criteriaJson?: string | null;

  @Column({ name: 'is_enabled', type: 'boolean', default: true })
  isEnabled: boolean;

  @BeforeInsert()
  assignCode(): void {
    if (!this.ruleCode) {
      this.ruleCode = generatePrefixedCode('HAUT');
    }
  }
}
