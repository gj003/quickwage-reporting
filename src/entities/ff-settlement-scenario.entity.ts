import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { generatePrefixedCode } from 'src/common/utility';
import { BaseEntityColumns } from './base-entity-columns.entity';

@Entity({ name: 'ff_settlement_scenario' })
@Index('uq_ff_settlement_scenario_code', ['scenarioCode'], { unique: true })
@Index('idx_ff_settlement_scenario_employee', ['employeeId'])
export class FfSettlementScenarioEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'ff_settlement_scenario_id' })
  ffSettlementScenarioId: string;

  @Column({ name: 'scenario_code', type: 'varchar', unique: true })
  scenarioCode: string;

  @Column({ name: 'employee_id', type: 'uuid' })
  employeeId: string;

  @Column({ type: 'varchar', length: 50 })
  type: string;

  @Column({ name: 'net_amount', type: 'numeric', precision: 12, scale: 2 })
  netAmount: string;

  @Column({ name: 'delta_note', type: 'varchar', length: 255 })
  deltaNote: string;

  @BeforeInsert()
  assignScenarioCode(): void {
    if (!this.scenarioCode) {
      this.scenarioCode = generatePrefixedCode('FFSCN');
    }
  }
}
