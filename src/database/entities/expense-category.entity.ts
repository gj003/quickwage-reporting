// /src/database/entities/expense-category.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';
import { ExpenseCategoryCustomFieldEntity } from './expense-category-custom-field.entity';
import { ExpenseClaimItemEntity } from './expense-claim-item.entity';
import { ExpensePolicyCategoryEntity } from './expense-policy-category.entity';

@Entity('expense_categories')
export class ExpenseCategoryEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'expense_category_id' })
  expense_category_id: string;

  @Column({ name: 'category_name', length: 100, type: 'varchar' })
  category_name: string;

  @Column({ name: 'category_code', length: 50, type: 'varchar' })
  category_code: string;

  @Column({ nullable: true, length: 100, type: 'varchar' })
  usage_type?: string | null;

  @Column({ nullable: true, length: 255, type: 'varchar' })
  short_description?: string | null;

  @Column({ nullable: true, length: 100, type: 'varchar' })
  icon?: string | null;

  @Column({ nullable: true, length: 20, type: 'varchar' })
  color?: string | null;

  @Column({ name: 'standard_attributes_json', nullable: true, type: 'jsonb' })
  standard_attributes_json?: Record<string, any> | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'uuid' })
  company_id: string;

  @ManyToOne(() => CompanyEntity, (rel) => rel.expenseCategories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @OneToMany(
    () => ExpenseCategoryCustomFieldEntity,
    (field) => field.expense_category,
    {
      cascade: true,
    },
  )
  custom_fields?: ExpenseCategoryCustomFieldEntity[];

  @OneToMany(
    () => ExpenseClaimItemEntity,
    (claimItem) => claimItem.expense_category,
  )
  expense_claim_items?: ExpenseClaimItemEntity[];

  @OneToMany(
    () => ExpensePolicyCategoryEntity,
    (policyCategory) => policyCategory.expense_category,
  )
  expense_policy_categories?: ExpensePolicyCategoryEntity[];
}
