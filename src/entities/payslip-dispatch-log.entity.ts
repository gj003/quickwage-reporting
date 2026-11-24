import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';

@Entity({ name: 'payslip_dispatch_logs' })
@Index('idx_payslip_dispatch_logs_company', ['company_id'])
export class PayslipDispatchLogEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payslip_dispatch_log_id' })
  payslip_dispatch_log_id: string;

  @Column({ type: 'uuid' }) company_id: string;
  @Column({ type: 'uuid' }) employee_payslip_id: string;
  @Column({ type: 'varchar', length: 20 }) channel: string;
  @Column({ type: 'varchar', length: 20, default: 'PENDING' }) status: string;
  @Column({ type: 'timestamptz', nullable: true }) sent_at?: Date | null;
  @Column({ type: 'text', nullable: true }) error_message?: string | null;
  @Column({ type: 'uuid', nullable: true }) sent_by?: string | null;

  @ManyToOne(() => CompanyEntity, (rel) => rel.id)
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;
}
