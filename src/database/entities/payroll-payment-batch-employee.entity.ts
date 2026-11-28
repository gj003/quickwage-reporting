import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { UserEntity } from './user.entity';
import { CompanyEntity } from './company.entity';

@Entity({ name: 'payroll_payment_batch_employees' })
@Index('idx_payroll_payment_batch_employees_company', ['company_id'])
export class PayrollPaymentBatchEmployeeEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payroll_payment_batch_employee_id' })
  payroll_payment_batch_employee_id: string;

  @Column({ type: 'uuid' }) company_id: string;
  @Column({ type: 'uuid' }) payroll_payment_batch_id: string;
  @Column({ type: 'uuid', nullable: true })
  payroll_employee_calculation_id?: string | null;
  @Column({ type: 'uuid' }) employee_id: string;

  @Column({ type: 'numeric', default: 0 }) amount: number;
  @Column({ type: 'varchar', length: 60, nullable: true }) account_number?:
    string | null;
  @Column({ type: 'varchar', length: 150, nullable: true }) bank_name?:
    string | null;
  @Column({ type: 'varchar', length: 30, nullable: true }) ifsc_code?:
    string | null;
  @Column({ type: 'varchar', length: 30, default: 'BANK_TRANSFER' })
  payment_mode: string;

  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) updated_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) deleted_by?: string | null;

  @ManyToOne(() => UserEntity, (rel) => rel.user_id)
  @JoinColumn({ name: 'employee_id' })
  employee: UserEntity;

  @ManyToOne(() => CompanyEntity, (rel) => rel.id)
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;
}
