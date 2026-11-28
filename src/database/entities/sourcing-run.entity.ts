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

@Entity({ name: 'sourcing_runs' })
export class SourcingRunEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('increment', { name: 'sourcing_run_id' })
  sourcingRunId: number;

  @Column({ name: 'run_code', type: 'varchar', length: 32, unique: true })
  runCode: string;

  @Column({ name: 'campaign_id', type: 'int' })
  campaignId: number;

  @ManyToOne(() => SourcingCampaignEntity, (campaign) => campaign.runs, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'campaign_id',
    referencedColumnName: 'sourcingCampaignId',
  })
  campaign: SourcingCampaignEntity;

  @Column({ name: 'started_at', type: 'timestamptz' })
  startedAt: Date;

  @Column({ name: 'finished_at', type: 'timestamptz', nullable: true })
  finishedAt?: Date | null;

  @Column({ name: 'stats_json', type: 'text', nullable: true })
  statsJson?: string | null;

  @BeforeInsert()
  assignCode(): void {
    if (!this.runCode) {
      this.runCode = generatePrefixedCode('SRCRUN');
    }
  }
}
