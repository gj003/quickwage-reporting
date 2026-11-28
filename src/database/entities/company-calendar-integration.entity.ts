import type { OrganizationProviderConfigDTO } from 'src/common/calendar/dto/organization-provider.dto';
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

/**
 * Per-company calendar credentials.
 *
 * Deliberately mirrors the column shape of `payroll_accounting_integration`
 * (the Zoho integration), because that is the pattern this codebase already
 * uses for per-tenant OAuth and there is no reason for a second one.
 *
 * Every secret column holds ciphertext from `SecretEncryptionService`, never a
 * raw value. The service-account key in particular is a *domain-wide*
 * credential: whoever holds it can read and write every calendar in the
 * customer's Workspace, so it must never be logged or returned by an endpoint.
 */
@Index('idx_company_calendar_integration_company_enabled', [
  'companyId',
  'enabled',
  'deleted_at',
])
@Entity({ name: 'company_calendar_integration' })
export class CompanyCalendarIntegrationEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'company_calendar_integration_id' })
  companyCalendarIntegrationId: string;

  @Column({ type: 'uuid', name: 'company_id', unique: true })
  companyId: string;

  /** Only 'google' today. Present so a Microsoft Graph provider can be added. */
  @Column({ type: 'varchar', length: 30, default: 'google' })
  provider: string;

  @Column({
    name: 'provider_configurations',
    type: 'jsonb',
    default: () => "'{}'::jsonb",
  })
  providerConfigurations: Record<string, OrganizationProviderConfigDTO>;

  /** 'domain_delegation' (service account impersonation) | 'user_oauth'. */
  @Column({
    type: 'varchar',
    length: 30,
    name: 'auth_mode',
    default: 'domain_delegation',
  })
  authMode: string;

  /**
   * Encrypted service-account JSON key. Superseded by
   * `encrypted_credentials`; still written for Google so a rollback keeps
   * working, and to be dropped once no deployed version reads it.
   */
  @Column({ type: 'text', name: 'encrypted_service_account', nullable: true })
  encryptedServiceAccount?: string | null;

  /**
   * The provider's credentials as one encrypted JSON object: the service
   * account key for Google, the tenant/client/secret for Microsoft.
   */
  @Column({ type: 'text', name: 'encrypted_credentials', nullable: true })
  encryptedCredentials?: string | null;

  /**
   * Where meeting links come from: `native` (Meet on Google, Teams on
   * Microsoft) or, later, `zoom`.
   */
  @Column({
    type: 'varchar',
    length: 30,
    name: 'conference_provider',
    default: 'native',
  })
  conferenceProvider: string;

  /**
   * The meeting-link provider's credentials (a Zoom Server-to-Server OAuth
   * app) as one encrypted JSON object. Kept when links switch back to
   * `native`, so re-selecting Zoom does not mean re-entering them.
   */
  @Column({
    type: 'text',
    name: 'encrypted_conference_credentials',
    nullable: true,
  })
  encryptedConferenceCredentials?: string | null;

  /**
   * The calendar provider used before the last switch, and its credentials.
   * Kept so that provider's existing events can still be cancelled while they
   * move to the new one. Replaced by the next switch.
   */
  @Column({
    type: 'varchar',
    length: 30,
    name: 'previous_provider',
    nullable: true,
  })
  previousProvider?: string | null;

  @Column({
    type: 'text',
    name: 'encrypted_previous_credentials',
    nullable: true,
  })
  encryptedPreviousCredentials?: string | null;

  @Column({ type: 'text', name: 'encrypted_client_id', nullable: true })
  encryptedClientId?: string | null;

  @Column({ type: 'text', name: 'encrypted_client_secret', nullable: true })
  encryptedClientSecret?: string | null;

  @Column({ type: 'text', name: 'encrypted_access_token', nullable: true })
  encryptedAccessToken?: string | null;

  @Column({ type: 'text', name: 'encrypted_refresh_token', nullable: true })
  encryptedRefreshToken?: string | null;

  @Column({
    type: 'timestamptz',
    name: 'access_token_expires_at',
    nullable: true,
  })
  accessTokenExpiresAt?: Date | null;

  @Column({
    type: 'varchar',
    length: 64,
    name: 'oauth_state_hash',
    nullable: true,
  })
  oauthStateHash?: string | null;

  @Column({
    type: 'timestamptz',
    name: 'oauth_state_expires_at',
    nullable: true,
  })
  oauthStateExpiresAt?: Date | null;

  /**
   * Turning this off stops new sync work without destroying the credentials,
   * which is what an admin actually wants when calendar sync misbehaves.
   */
  @Column({ type: 'boolean', default: false })
  enabled: boolean;

  @Column({ name: 'mail_enabled', type: 'boolean', default: false })
  mailEnabled: boolean;

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company?: CompanyEntity;
}
