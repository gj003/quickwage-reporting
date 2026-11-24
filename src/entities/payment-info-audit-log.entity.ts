import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity({ name: 'payment_info_audit_log' })
export class PaymentInfoAuditLogEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payment_info_audit_log_id' })
  payment_info_audit_log_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  employee_user_id: string;

  @Column({ type: 'varchar', nullable: true })
  employee_number?: string | null;

  @Column({ type: 'varchar', nullable: true })
  employee_name?: string | null;

  @Column({ type: 'uuid', nullable: true })
  performed_by_user_id?: string | null;

  @Column({ type: 'varchar', nullable: true })
  performed_by_name?: string | null;

  @Column({ type: 'varchar' })
  module: string;

  @Column({ type: 'varchar' })
  action: string;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  changes: Array<{ fieldName: string; oldValue: string; newValue: string }>;

  @Column({ type: 'text', nullable: true })
  comment?: string | null;
}
