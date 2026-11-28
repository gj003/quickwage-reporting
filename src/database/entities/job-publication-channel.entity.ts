import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { generatePrefixedCode } from 'src/common/utility';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { CompanyEntity } from './company.entity';
import { JobListingEntity } from './job-listing.entity';
import { JobPublicationChannel, JobPublicationStatus } from 'src/common/enum';

/**
 * Per-job publication state for one channel (career portal, internal job
 * portal, LinkedIn, Naukri, Indeed).
 *
 * The two first-party channels (CAREER_PORTAL, INTERNAL_PORTAL) are owned by
 * this application, so toggling them genuinely publishes/unpublishes.
 *
 * The external job-board channels are gated on a configured integration. No
 * LinkedIn/Naukri/Indeed credentials or client exist anywhere in this repo,
 * so those rows are recorded with status INTEGRATION_NOT_CONFIGURED and the
 * API reports that honestly rather than claiming a successful external post.
 * When a real integration lands, only the publish path needs to change - the
 * external_reference / last_error columns are already here to hold its result.
 */
@Index('idx_job_publication_channels_job_deleted', [
  'job_listing_id',
  'deleted_at',
])
@Index('idx_job_publication_channels_company', ['company_id'])
@Index(
  'uq_job_publication_channels_job_channel',
  ['job_listing_id', 'channel'],
  {
    unique: true,
    where: '"deleted_at" IS NULL',
  },
)
@Entity({ name: 'job_publication_channels' })
export class JobPublicationChannelEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'job_publication_channel_id' })
  job_publication_channel_id: string;

  @Column({
    name: 'job_publication_channel_code',
    type: 'varchar',
    length: 64,
    unique: true,
  })
  job_publication_channel_code: string;

  @Column({ name: 'company_id', type: 'uuid' })
  company_id: string;

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @Column({ name: 'job_listing_id', type: 'uuid' })
  job_listing_id: string;

  @ManyToOne(() => JobListingEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'job_listing_id',
    referencedColumnName: 'job_listing_id',
  })
  job_listing: JobListingEntity;

  @Column({ name: 'channel', type: 'varchar', length: 40 })
  channel: JobPublicationChannel;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 40,
    default: JobPublicationStatus.NOT_PUBLISHED,
  })
  status: JobPublicationStatus;

  @Column({ name: 'is_published', type: 'boolean', default: false })
  is_published: boolean;

  @Column({ name: 'published_at', type: 'timestamptz', nullable: true })
  published_at?: Date | null;

  /** Id returned by the external board once a real integration posts the job. */
  @Column({
    name: 'external_reference',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  external_reference?: string | null;

  @Column({ name: 'last_error', type: 'text', nullable: true })
  last_error?: string | null;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updated_by?: string | null;

  @BeforeInsert()
  assignCode(): void {
    if (!this.job_publication_channel_code) {
      this.job_publication_channel_code = generatePrefixedCode(
        'JOB_PUBLICATION_CHANNEL',
      );
    }
  }
}
