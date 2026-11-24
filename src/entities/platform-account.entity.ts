import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';

export type PlatformAccountType =
  | 'LINKEDIN'
  | 'GITHUB'
  | 'ANGELLIST'
  | 'STACKOVERFLOW'
  | 'INDEED'
  | 'GLASSDOOR'
  | 'NAUKRI'
  | 'DRIBBBLE';

@Entity({ name: 'platform_accounts' })
@Index(['orgId', 'type'], { unique: true })
export class PlatformAccountEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('increment', { name: 'platform_account_id' })
  platformAccountId: number;

  @Column({ name: 'org_id', type: 'varchar', length: 64 })
  orgId: string;

  @Column({ name: 'type', type: 'varchar', length: 50 })
  type: PlatformAccountType;

  @Column({ name: 'api_key', type: 'varchar', length: 200, nullable: true })
  apiKey?: string | null;

  @Column({ name: 'monthly_limit', type: 'int', default: 0 })
  monthlyLimit: number;

  @Column({
    name: 'cost_per_contact',
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: 0,
  })
  costPerContact: string;

  @Column({
    name: 'quality_score',
    type: 'numeric',
    precision: 5,
    scale: 2,
    default: 0,
  })
  qualityScore: string;

  @Column({ name: 'is_connected', type: 'boolean', default: false })
  isConnected: boolean;

  @Column({ name: 'credits_remaining', type: 'int', default: 0 })
  creditsRemaining: number;

  @Column({ name: 'last_synced_at', type: 'timestamptz', nullable: true })
  lastSyncedAt?: Date | null;
}
