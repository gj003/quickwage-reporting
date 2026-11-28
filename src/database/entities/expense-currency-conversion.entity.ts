import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('expense_currency_conversions')
export class ExpenseCurrencyConversionEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  expense_currency_conversion_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'varchar', length: 8 })
  from_currency: string;

  @Column({ type: 'varchar', length: 8 })
  to_currency: string;

  @Column({ type: 'varchar', length: 50, default: 'MANUAL' })
  conversion_type: string;

  @Column({ type: 'decimal', precision: 14, scale: 6 })
  forward_rate: number;

  @Column({ type: 'decimal', precision: 14, scale: 6 })
  reverse_rate: number;

  @Column({ type: 'boolean', default: false })
  auto_exchange: boolean;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;
}
