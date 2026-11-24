import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('expense_advance_status_logs')
export class ExpenseAdvanceStatusLogEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  expense_advance_status_log_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  expense_advance_request_id: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  from_status?: string | null;

  @Column({ type: 'varchar', length: 40 })
  to_status: string;

  @Column({ type: 'uuid', nullable: true })
  action_by?: string | null;

  @Column({ type: 'text', nullable: true })
  note?: string | null;
}
