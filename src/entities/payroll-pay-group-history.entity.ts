import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'payroll_pay_group_history' })
export class PayrollPayGroupHistoryEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payroll_pay_group_history_id' })
  payroll_pay_group_history_id: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column({ type: 'uuid' })
  payroll_pay_group_id: string;

  @Column({ type: 'varchar', length: 20 })
  action: 'CREATED' | 'UPDATED';

  @Column({ type: 'jsonb' })
  snapshot: Record<string, unknown>;

  @Column({ type: 'uuid', nullable: true })
  acted_by?: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
