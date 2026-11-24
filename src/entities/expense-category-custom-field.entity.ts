import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { ExpenseCategoryEntity } from './expense-category.entity';

@Entity('expense_category_custom_fields')
export class ExpenseCategoryCustomFieldEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  expense_category_custom_field_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  expense_category_id: string;

  @Column({ type: 'varchar', length: 120 })
  field_name: string;

  @Column({ type: 'varchar', length: 60 })
  field_type: string;

  @Column({ type: 'boolean', default: false })
  is_mandatory: boolean;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'jsonb', nullable: true })
  field_options_json?: Record<string, any> | null;

  @ManyToOne(
    () => ExpenseCategoryEntity,
    (category) => category.custom_fields,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'expense_category_id' })
  expense_category: ExpenseCategoryEntity;
}
