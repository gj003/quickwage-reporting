import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('expense_advance_settlements')
export class ExpenseAdvanceSettlementEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  expense_advance_settlement_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  expense_advance_request_id: string;

  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0 })
  settled_amount: number;

  @Column({ type: 'varchar', length: 40, default: 'PENDING' })
  status: string;
}
