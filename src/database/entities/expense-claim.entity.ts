import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('expense_claims')
export class ExpenseClaimEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  expense_claim_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  employee_id: string;

  @Column({ type: 'uuid', nullable: true })
  expense_policy_id?: string | null;

  @Column({ type: 'varchar', length: 32, unique: true })
  expense_claim_code: string;

  @Column({ type: 'varchar', length: 180 })
  claim_title: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'varchar', length: 40, default: 'DRAFT' })
  status: string;

  @Column({ type: 'varchar', length: 8, default: 'INR' })
  claim_currency: string;

  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0 })
  total_amount: number;

  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0 })
  total_payable_amount: number;

  @Column({ type: 'int', default: 0 })
  total_items: number;

  @Column({ type: 'int', default: 0 })
  current_approval_level: number;

  @Column({ type: 'varchar', length: 120, nullable: true })
  waiting_on?: string | null;

  @Column({ type: 'uuid', nullable: true })
  action_taken_by?: string | null;

  @BeforeInsert()
  setCode() {
    if (!this.expense_claim_code) {
      this.expense_claim_code = generatePrefixedCode('EXPCLM');
    }
  }
}
