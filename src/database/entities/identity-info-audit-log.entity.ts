import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity({ name: 'identity_info_audit_log' })
export class IdentityInfoAuditLogEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'identity_info_audit_log_id' })
  identity_info_audit_log_id: string;

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

  @Column({ type: 'varchar' })
  activity_type: string;

  @Column({ type: 'varchar', nullable: true })
  document_type?: string | null;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  changes: Array<{
    fieldName: string;
    oldValue: string | null;
    newValue: string | null;
  }>;

  @Column({ type: 'text', nullable: true })
  comment?: string | null;
}
