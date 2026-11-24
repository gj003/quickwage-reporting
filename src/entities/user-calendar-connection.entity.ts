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
import { UserEntity } from './user.entity';

/**
 * One user's own sign-in to a calendar (Google / Microsoft) or meeting-link
 * (Zoom) account, replacing the company-wide credential.
 *
 * A row exists from the moment the user starts signing in: the `oauth_*`
 * columns hold that in-flight attempt (single-use nonce, PKCE verifier) and are
 * cleared when the callback consumes them. They sit beside, not in place of,
 * the refresh token, so a reconnect attempt that is abandoned never breaks a
 * connection that already works.
 *
 * Every secret column is `SecretEncryptionService` ciphertext and must never be
 * logged or returned by an endpoint.
 */
@Index('uq_user_calendar_connection_user_provider', ['userId', 'provider'], {
  unique: true,
})
@Entity({ name: 'user_calendar_connection' })
export class UserCalendarConnectionEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'user_calendar_connection_id' })
  userCalendarConnectionId: string;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string;

  /** 'google' | 'microsoft' | 'zoom'. */
  @Column({ type: 'varchar', length: 30 })
  provider: string;

  /** 'pending' (sign-in started, never completed) | 'active' | 'revoked' | 'error'. */
  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status: string;

  @Column({
    type: 'varchar',
    length: 300,
    name: 'oauth_client_id',
    nullable: true,
  })
  oauthClientId?: string | null;

  /** The account the user signed in with; may differ from their HRMS email. */
  @Column({
    type: 'varchar',
    length: 320,
    name: 'account_email',
    nullable: true,
  })
  accountEmail?: string | null;

  /** Microsoft only: 'work' | 'personal'. Teams links need 'work'. */
  @Column({ type: 'varchar', length: 20, name: 'account_type', nullable: true })
  accountType?: string | null;

  @Column({ type: 'text', name: 'encrypted_refresh_token', nullable: true })
  encryptedRefreshToken?: string | null;

  @Column({ type: 'text', array: true, default: () => "'{}'" })
  scopes: string[];

  @Column({ type: 'text', name: 'last_error', nullable: true })
  lastError?: string | null;

  @Column({ type: 'timestamptz', name: 'connected_at', nullable: true })
  connectedAt?: Date | null;

  @Column({ type: 'timestamptz', name: 'last_used_at', nullable: true })
  lastUsedAt?: Date | null;

  /** Single-use nonce of the sign-in in flight; also signed into `state`. */
  @Column({ type: 'varchar', length: 64, name: 'oauth_nonce', nullable: true })
  oauthNonce?: string | null;

  /** PKCE verifier of the sign-in in flight. Kept server-side, never in `state`. */
  @Column({ type: 'text', name: 'encrypted_code_verifier', nullable: true })
  encryptedCodeVerifier?: string | null;

  @Column({ type: 'timestamptz', name: 'oauth_expires_at', nullable: true })
  oauthExpiresAt?: Date | null;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company?: CompanyEntity;
}
