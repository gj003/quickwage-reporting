import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('shift_weekly_off_rules')
@Index('idx_shift_weekly_off_rules_company', ['company_id'])
@Index('idx_shift_weekly_off_rules_company_name', ['company_id', 'name'])
export class ShiftWeeklyOffRuleEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  shift_weekly_off_rule_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  rule_code: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description?: string | null;

  @Column({ type: 'boolean', default: false })
  allow_shift_assignment_requests: boolean;

  @Column({ type: 'boolean', default: false })
  allow_weekly_off_requests: boolean;

  @Column({ type: 'varchar', length: 40, default: 'ACTIVE' })
  status: string;

  @Column({ type: 'uuid', nullable: true })
  created_by?: string | null;

  @BeforeInsert()
  assignCode(): void {
    if (!this.rule_code) {
      this.rule_code = generatePrefixedCode('SHIFT_RULE');
    }
  }
}
