// src/database/entities/performance-rating-scale.entity.ts

import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { SharedEntity } from './shared.entity';
import { PerformanceRatingCode } from 'src/common/enum';

/**
 * How a company presents one of the fixed performance ratings — its label,
 * guidance and colour — and whether reviewers may still pick it.
 *
 * The codes themselves never change: calibration, PIP and compensation rules
 * are written against them. A company with no rows uses the built-in defaults
 * (`RATING_SCALE_DEFAULTS`), so rows only exist once HR has saved the scale.
 */
@Entity('performance_rating_scales')
@Unique('uq_rating_scales_company_code', ['company_id', 'code'])
export class PerformanceRatingScaleEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  performance_rating_scales_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'varchar', length: 20 })
  code: PerformanceRatingCode;

  @Column({ type: 'varchar', length: 40 })
  label: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'varchar', length: 7 })
  color: string;

  @Column({ type: 'bool', default: () => 'true' })
  is_active: boolean;

  @Column({ type: 'uuid', nullable: true })
  updated_by?: string | null;
}
