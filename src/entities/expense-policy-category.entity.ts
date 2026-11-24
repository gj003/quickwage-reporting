import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { ExpenseCategoryEntity } from './expense-category.entity';

@Entity('expense_policy_categories')
export class ExpensePolicyCategoryEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  expense_policy_category_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  expense_policy_id: string;

  @Column({ type: 'uuid' })
  expense_category_id: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @ManyToOne(() => ExpenseCategoryEntity, { onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'expense_category_id' })
  expense_category: ExpenseCategoryEntity;
}
