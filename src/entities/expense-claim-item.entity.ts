import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { ExpenseCategoryEntity } from './expense-category.entity';

@Entity('expense_claim_items')
export class ExpenseClaimItemEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  expense_claim_item_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  employee_id: string;

  @Column({ type: 'uuid', nullable: true })
  expense_claim_id?: string | null;

  @Column({ type: 'uuid', nullable: true })
  expense_policy_id?: string | null;

  @Column({ type: 'uuid' })
  expense_category_id: string;

  @Column({ type: 'varchar', length: 140 })
  expense_title: string;

  @Column({ type: 'date' })
  expense_date: string;

  @Column({ type: 'varchar', length: 8 })
  currency: string;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  amount: number;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  payable_amount: number;

  @Column({ type: 'text', nullable: true })
  comment?: string | null;

  @Column({ type: 'uuid', nullable: true })
  project_id?: string | null;

  @Column({ type: 'varchar', length: 64, nullable: true })
  cost_center_id?: string | null;

  @Column({ type: 'varchar', length: 40, default: 'DRAFT' })
  status: string;

  @ManyToOne(() => ExpenseCategoryEntity, { onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'expense_category_id' })
  expense_category: ExpenseCategoryEntity;
}
