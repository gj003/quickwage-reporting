import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { CompanyEntity } from './company.entity';

@Entity({ name: 'company_user_oauth_app' })
@Index('uq_company_user_oauth_app_provider', ['companyId', 'provider'], {
  unique: true,
})
@Index('idx_company_user_oauth_app_company', ['companyId'])
export class CompanyUserOAuthAppEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'company_user_oauth_app_id' })
  companyUserOAuthAppId: string;
  @Column({ type: 'uuid', name: 'company_id' }) companyId: string;
  @Column({ type: 'varchar', length: 30 }) provider: string;
  @Column({ type: 'varchar', length: 300, name: 'client_id' }) clientId: string;
  @Column({ type: 'text', name: 'encrypted_client_secret' })
  encryptedClientSecret: string;
  @Column({ type: 'boolean', default: false }) enabled: boolean;
  @Column({ type: 'boolean', default: false, name: 'calendar_enabled' })
  calendarEnabled: boolean;
  @Column({ type: 'boolean', default: false, name: 'mail_enabled' })
  mailEnabled: boolean;
  @Column({ type: 'varchar', length: 100, nullable: true, name: 'tenant_id' })
  tenantId: string | null;
  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company?: CompanyEntity;
}
