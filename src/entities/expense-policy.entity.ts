import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('expense_policies')
export class ExpensePolicyEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  expense_policy_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'varchar', length: 32, unique: true })
  expense_policy_code: string;

  @Column({ type: 'varchar', length: 150 })
  policy_name: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'varchar', length: 5, default: 'INR' })
  base_currency: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  payout_mode_defined_by?: string | null;

  @Column({ type: 'boolean', default: false })
  allow_future_claim: boolean;

  @Column({ type: 'boolean', default: true })
  requires_approval: boolean;

  @Column({ type: 'boolean', default: true })
  same_chain_for_all_categories: boolean;

  @Column({ type: 'boolean', default: false })
  notify_previous_approvers_on_reject: boolean;

  @Column({ type: 'boolean', default: false })
  threshold_based_alternate_chain: boolean;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  threshold_amount?: number | null;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @BeforeInsert()
  setCode() {
    if (!this.expense_policy_code) {
      this.expense_policy_code = generatePrefixedCode('EXPPOL');
    }
  }
}
