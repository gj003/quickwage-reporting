import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('expense_claim_receipts')
export class ExpenseClaimReceiptEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  expense_claim_receipt_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  expense_claim_item_id: string;

  @Column({ type: 'varchar', length: 500 })
  file_url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  file_name?: string | null;
}
