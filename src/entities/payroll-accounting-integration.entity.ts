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
@Entity({ name: 'payroll_accounting_integration' })
@Index('idx_payroll_accounting_integration_company', ['company_id'])
@Index('uq_payroll_accounting_integration_active', ['company_id', 'provider'], {
  unique: true,
  where: '"deleted_at" IS NULL',
})
export class PayrollAccountingIntegrationEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payroll_accounting_integration_id' })
  readonly payroll_accounting_integration_id: string;
  @Column({ type: 'uuid' }) company_id: string;
  @Column({ type: 'varchar', length: 30 }) provider: string;
  @Column({ type: 'varchar', length: 30, default: 'NOT_CONNECTED' })
  connection_status: string;
  @Column({ type: 'varchar', length: 20, default: 'zoho.com' })
  zoho_domain: string;
  @Column({ type: 'varchar', length: 120, nullable: true })
  external_organization_id?: string | null;
  @Column({ type: 'varchar', length: 255, nullable: true })
  external_organization_name?: string | null;
  @Column({ type: 'jsonb', default: () => "'[]'::jsonb" })
  component_mappings: Array<Record<string, unknown>>;
  @Column({ type: 'text', nullable: true, select: false })
  encrypted_access_token?: string | null;
  @Column({ type: 'text', nullable: true, select: false })
  encrypted_refresh_token?: string | null;
  @Column({ type: 'text', nullable: true, select: false })
  encrypted_client_id?: string | null;
  @Column({ type: 'text', nullable: true, select: false })
  encrypted_client_secret?: string | null;
  @Column({ type: 'timestamptz', nullable: true })
  access_token_expires_at?: Date | null;
  @Column({ type: 'varchar', length: 64, nullable: true, select: false })
  oauth_state_hash?: string | null;
  @Column({ type: 'timestamptz', nullable: true, select: false })
  oauth_state_expires_at?: Date | null;
  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) updated_by?: string | null;
  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;
}
