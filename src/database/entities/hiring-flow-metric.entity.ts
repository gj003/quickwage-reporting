import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { HiringFlowEntity } from './hiring-flow.entity';

@Entity({ name: 'hiring_flow_metrics' })
export class HiringFlowMetricEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'hiring_flow_metric_id' })
  hiringFlowMetricId: string;

  @Column({ name: 'flow_id', type: 'uuid' })
  flowId: string;

  @ManyToOne(() => HiringFlowEntity, (flow) => flow.metrics, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'flow_id', referencedColumnName: 'hiringFlowId' })
  flow: HiringFlowEntity;

  @Column({ name: 'window', type: 'varchar', length: 10 })
  window: string;

  @Column({
    name: 'overall_conversion',
    type: 'numeric',
    precision: 6,
    scale: 2,
    nullable: true,
  })
  overallConversion?: string | null;

  @Column({
    name: 'avg_time_to_hire_days',
    type: 'numeric',
    precision: 6,
    scale: 2,
    nullable: true,
  })
  avgTimeToHireDays?: string | null;

  @Column({ name: 'dropoffs_json', type: 'text', nullable: true })
  dropoffsJson?: string | null;

  @Column({ name: 'computed_at', type: 'timestamptz' })
  computedAt: Date;
}
