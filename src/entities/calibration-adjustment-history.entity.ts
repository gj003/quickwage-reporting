// src/database/entities/calibration-adjustment-history.entity.ts

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CalibrationAdjustmentEntity } from './calibration-adjustment.entity';
import {
  CalibrationAdjustmentHistoryAction,
  PerformanceRatingCode,
} from 'src/common/enum';

/**
 * Every move of one employee's rating during calibration.
 *
 * The adjustment row only holds the value in force; this is where the
 * sequence lives, including moves that were later cleared or superseded by an
 * appeal. `manager_rating_code` is repeated on each row because it is what the
 * move was made against at that moment.
 */
@Entity('performance_calibration_adjustment_history')
@Index('idx_calibration_adjustment_history_adjustment', [
  'adjustment_id',
  'created_at',
])
export class CalibrationAdjustmentHistoryEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  performance_calibration_adjustment_history_id: string;

  @Column({ type: 'uuid' })
  adjustment_id: string;

  @Column({ type: 'varchar', length: 20 })
  action: CalibrationAdjustmentHistoryAction;

  @Column({ type: 'uuid', nullable: true })
  actor_user_id?: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  from_rating_code?: PerformanceRatingCode | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  to_rating_code?: PerformanceRatingCode | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  manager_rating_code?: PerformanceRatingCode | null;

  @Column({ type: 'text', nullable: true })
  note?: string | null;

  @ManyToOne(() => CalibrationAdjustmentEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'adjustment_id' })
  adjustment?: CalibrationAdjustmentEntity;
}
