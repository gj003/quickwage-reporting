import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { JobRequisitionEntity } from './job-requisition.entity';
import { SourcedCandidateEntity } from './sourced-candidate.entity';
import { SourcingRunEntity } from './sourcing-run.entity';

export type SourcingCampaignStatus =
  'ACTIVE' | 'PAUSED' | 'active' | 'paused' | 'stopped';

@Entity({ name: 'sourcing_campaigns' })
export class SourcingCampaignEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('increment', { name: 'sourcing_campaign_id' })
  sourcingCampaignId: number;

  @Column({ name: 'campaign_code', type: 'varchar', length: 32, unique: true })
  campaignCode: string;

  @Column({ name: 'org_id', type: 'varchar', length: 64 })
  orgId: string;

  @Column({ name: 'name', type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'job_title', type: 'varchar', length: 200, nullable: true })
  jobTitle?: string | null;

  @Column({ name: 'department', type: 'varchar', length: 150, nullable: true })
  department?: string | null;

  @Column({
    name: 'experience_level',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  experienceLevel?: string | null;

  @Column({
    name: 'locations',
    type: 'text',
    array: true,
    default: () => 'ARRAY[]::text[]',
  })
  locations: string[];

  @Column({ name: 'salary_range', type: 'jsonb', nullable: true })
  salaryRange?: Record<string, unknown> | null;

  @Column({ name: 'platforms_json', type: 'jsonb', nullable: true })
  platformsJson?: Record<string, unknown> | string[] | null;

  @Column({ name: 'criteria_json', type: 'jsonb', nullable: true })
  criteriaJson?: Record<string, unknown> | null;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 20,
    default: 'ACTIVE',
  })
  status: SourcingCampaignStatus;

  @Column({ name: 'requisition_id', type: 'int', nullable: true })
  requisitionId?: number | null;

  @ManyToOne(
    () => JobRequisitionEntity,
    (requisition) => requisition.sourcingCampaigns,
    {
      nullable: true,
      onDelete: 'SET NULL',
    },
  )
  @JoinColumn({
    name: 'requisition_id',
    referencedColumnName: 'jobRequisitionId',
  })
  requisition?: JobRequisitionEntity | null;

  @OneToMany(() => SourcedCandidateEntity, (candidate) => candidate.campaign)
  candidates: SourcedCandidateEntity[];

  @OneToMany(() => SourcingRunEntity, (run) => run.campaign)
  runs: SourcingRunEntity[];

  @BeforeInsert()
  assignCode(): void {
    if (!this.campaignCode) {
      this.campaignCode = generatePrefixedCode('SRCMP');
    }
  }
}
