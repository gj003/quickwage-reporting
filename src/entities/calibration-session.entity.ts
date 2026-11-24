// src/database/entities/calibration-session.entity.ts

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CalibrationState } from 'src/common/enum';
import { ReviewCycleEntity } from './review-cycle.entity';
import { CalibrationBucketSummary } from 'src/modules/performance/review-cycles/dto/calibration.dto';

@Entity('performance_calibration_sessions')
@Index('idx_calibration_cycle', ['cycle_id'])
export class CalibrationSessionEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  performance_calibration_sessions_id: string;

  @Column({ type: 'uuid' })
  cycle_id: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: CalibrationState.DRAFT,
  })
  state: CalibrationState;

  @Column({ type: 'jsonb', nullable: false, default: () => "'{}'" })
  buckets: CalibrationBucketSummary;

  @Column({ type: 'timestamptz', nullable: true })
  finalized_at?: Date | null;

  @Column({ type: 'uuid', nullable: true })
  finalized_by?: string | null;

  @ManyToOne(() => ReviewCycleEntity, (cycle) => cycle.calibration_sessions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cycle_id' })
  cycle: ReviewCycleEntity;
}
