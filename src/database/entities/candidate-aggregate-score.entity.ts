import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { JobRequisitionEntity } from './job-requisition.entity';

export type CandidateAggregateTrend = 'improving' | 'declining' | 'stable';

@Index('idx_candidate_aggregate_score_org_candidate', ['orgId', 'candidateId'])
@Index('idx_candidate_aggregate_score_org_requisition', [
  'orgId',
  'requisitionId',
])
@Index(
  'uniq_candidate_aggregate_score',
  ['orgId', 'candidateId', 'requisitionId'],
  { unique: true },
)
@Entity({ name: 'candidate_aggregate_scores' })
export class CandidateAggregateScoreEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('increment', {
    name: 'candidate_aggregate_score_id',
  })
  candidateAggregateScoreId: number;

  @Column({ name: 'agg_code', type: 'varchar', length: 32, unique: true })
  aggCode: string;

  @Column({ name: 'org_id', type: 'uuid' })
  orgId: string;

  @Column({ name: 'candidate_id', type: 'int' })
  candidateId: number;

  @Column({ name: 'requisition_id', type: 'int' })
  requisitionId: number;

  @ManyToOne(
    () => JobRequisitionEntity,
    (requisition) => requisition.aggregates,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'requisition_id',
    referencedColumnName: 'jobRequisitionId',
  })
  requisition: JobRequisitionEntity;

  @Column({
    name: 'overall_fit',
    type: 'numeric',
    precision: 5,
    scale: 2,
    default: 0,
  })
  overallFit: string;

  @Column({ name: 'signals_json', type: 'text', nullable: true })
  signalsJson?: string | null;

  @Column({ name: 'trend', type: 'varchar', length: 20, default: 'stable' })
  trend: CandidateAggregateTrend;

  @BeforeInsert()
  assignCode(): void {
    if (!this.aggCode) {
      this.aggCode = generatePrefixedCode('CNDAGG');
    }
  }
}
