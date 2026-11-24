import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('expense_advance_receipt_submissions')
export class ExpenseAdvanceReceiptSubmissionEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  expense_advance_receipt_submission_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  expense_advance_request_id: string;

  @Column({ type: 'varchar', length: 500 })
  file_url: string;

  @Column({ type: 'varchar', length: 40, default: 'SUBMITTED' })
  status: string;
}
