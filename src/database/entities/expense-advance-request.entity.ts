import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('expense_advance_requests')
export class ExpenseAdvanceRequestEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  expense_advance_request_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  employee_id: string;

  @Column({ type: 'varchar', length: 32, unique: true })
  expense_advance_request_code: string;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  requested_amount: number;

  @Column({ type: 'varchar', length: 8, default: 'INR' })
  currency: string;

  @Column({ type: 'varchar', length: 40, default: 'PENDING_APPROVAL' })
  status: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  payment_mode?: string | null;

  @Column({ type: 'date', nullable: true })
  payment_date?: string | null;

  @Column({ type: 'text', nullable: true })
  remarks?: string | null;

  @BeforeInsert()
  setCode() {
    if (!this.expense_advance_request_code) {
      this.expense_advance_request_code = generatePrefixedCode('ADVREQ');
    }
  }
}
