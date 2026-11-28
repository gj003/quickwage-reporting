import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { SourcingCampaignEntity } from './sourcing-campaign.entity';

export type SourcedCandidateStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'RESPONDED'
  | 'INTERESTED'
  | 'new'
  | 'contacted'
  | 'responded'
  | 'interested';

export type SourcedCandidatePlatform =
  | 'LINKEDIN'
  | 'GITHUB'
  | 'ANGELLIST'
  | 'STACKOVERFLOW'
  | 'INDEED'
  | 'GLASSDOOR'
  | 'NAUKRI'
  | 'DRIBBBLE';

@Entity({ name: 'sourced_candidates' })
export class SourcedCandidateEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('increment', { name: 'sourced_candidate_id' })
  sourcedCandidateId: number;

  @Column({ name: 'sourced_code', type: 'varchar', length: 32, unique: true })
  sourcedCode: string;

  @Column({ name: 'campaign_id', type: 'int' })
  campaignId: number;

  @ManyToOne(() => SourcingCampaignEntity, (campaign) => campaign.candidates, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'campaign_id',
    referencedColumnName: 'sourcingCampaignId',
  })
  campaign: SourcingCampaignEntity;

  @Column({ name: 'external_id', type: 'varchar', length: 150 })
  externalId: string;

  @Column({ name: 'platform', type: 'varchar', length: 50 })
  platform: SourcedCandidatePlatform;

  @Column({ name: 'name', type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'title', type: 'varchar', length: 200, nullable: true })
  title?: string | null;

  @Column({ name: 'company', type: 'varchar', length: 200, nullable: true })
  company?: string | null;

  @Column({ name: 'location', type: 'varchar', length: 200, nullable: true })
  location?: string | null;

  @Column({
    name: 'years_exp',
    type: 'numeric',
    precision: 6,
    scale: 2,
    nullable: true,
  })
  yearsExp?: string | null;

  @Column({ name: 'contacts_json', type: 'jsonb', nullable: true })
  contactsJson?: Record<string, unknown> | null;

  @Column({
    name: 'skills',
    type: 'text',
    array: true,
    default: () => 'ARRAY[]::text[]',
  })
  skills: string[];

  @Column({ name: 'education_json', type: 'jsonb', nullable: true })
  educationJson?: Record<string, unknown> | Record<string, unknown>[] | null;

  @Column({ name: 'expectations_json', type: 'jsonb', nullable: true })
  expectationsJson?: Record<string, unknown> | null;

  @Column({ name: 'fit_score', type: 'int', default: 0 })
  fitScore: number;

  @Column({ name: 'ai_insights_json', type: 'jsonb', nullable: true })
  aiInsightsJson?: Record<string, unknown> | null;

  @Column({ name: 'status', type: 'varchar', length: 32, default: 'NEW' })
  status: SourcedCandidateStatus;

  @BeforeInsert()
  assignCode(): void {
    if (!this.sourcedCode) {
      this.sourcedCode = generatePrefixedCode('SRCCD');
    }
  }
}
