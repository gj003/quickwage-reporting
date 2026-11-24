import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('expense_claim_custom_field_values')
export class ExpenseClaimCustomFieldValueEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  expense_claim_custom_field_value_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  expense_claim_item_id: string;

  @Column({ type: 'uuid', nullable: true })
  expense_category_custom_field_id?: string | null;

  @Column({ type: 'varchar', length: 120 })
  field_name: string;

  @Column({ type: 'text', nullable: true })
  field_value?: string | null;
}
