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
import { HiringFlowEntity } from './hiring-flow.entity';
import { JobPostingEntity } from './job-posting.entity';
import { CandidateAggregateScoreEntity } from './candidate-aggregate-score.entity';
import { SourcingCampaignEntity } from './sourcing-campaign.entity';

@Entity({ name: 'job_requisitions' })
export class JobRequisitionEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('increment', { name: 'job_requisition_id' })
  jobRequisitionId: number;

  @Column({ name: 'req_code', type: 'varchar', length: 32, unique: true })
  reqCode: string;

  @Column({ name: 'title', type: 'varchar', length: 200 })
  title: string;

  @Column({ name: 'department', type: 'varchar', length: 150 })
  department: string;

  @Column({ name: 'location', type: 'varchar', length: 150 })
  location: string;

  @Column({ name: 'employment_type', type: 'varchar', length: 100 })
  employmentType: string;

  @Column({ name: 'experience_level', type: 'varchar', length: 100 })
  experienceLevel: string;

  @Column({ name: 'salary_range_json', type: 'text', nullable: true })
  salaryRangeJson?: string | null;

  @Column({ name: 'hiring_flow_id', type: 'uuid' })
  hiringFlowId: string;

  @ManyToOne(() => HiringFlowEntity, (flow) => flow.jobRequisitions, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'hiring_flow_id', referencedColumnName: 'hiringFlowId' })
  hiringFlow: HiringFlowEntity;

  @Column({ name: 'headcount', type: 'int', default: 1 })
  headcount: number;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 20,
    default: 'draft',
  })
  status: 'draft' | 'open' | 'paused' | 'closed';

  @OneToMany(() => JobPostingEntity, (posting) => posting.requisition)
  postings: JobPostingEntity[];

  @OneToMany(
    () => CandidateAggregateScoreEntity,
    (aggregate) => aggregate.requisition,
  )
  aggregates: CandidateAggregateScoreEntity[];

  @OneToMany(() => SourcingCampaignEntity, (campaign) => campaign.requisition)
  sourcingCampaigns: SourcingCampaignEntity[];

  @BeforeInsert()
  assignCode(): void {
    if (!this.reqCode) {
      this.reqCode = generatePrefixedCode('JOBREQ');
    }
  }
}
