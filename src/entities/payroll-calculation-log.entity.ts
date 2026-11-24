import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity({ name: 'payroll_calculation_logs' })
export class PayrollCalculationLogEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payroll_calculation_log_id' })
  payroll_calculation_log_id: string;

  @Column({ type: 'uuid' }) organization_id: string;
  @Column({ type: 'uuid' }) pay_group_id: string;
  @Column({ type: 'uuid' }) employee_id: string;
  @Column({ type: 'varchar', length: 100 }) calculation_run_id: string;
  @Column({ type: 'varchar', length: 100 }) step: string;
  @Column({ type: 'jsonb', nullable: true }) payload?: Record<
    string,
    any
  > | null;
  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
}
