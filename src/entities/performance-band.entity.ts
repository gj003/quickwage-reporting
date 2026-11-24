import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'performance_bands' })
@Index('idx_performance_band_active', ['isActive'])
export class PerformanceBandEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'performance_band_id' })
  performanceBandId: string;

  @Column({ type: 'varchar', name: 'band_code', unique: true })
  bandCode: string;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'numeric', precision: 5, scale: 2, name: 'rating_range_min' })
  ratingRangeMin: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, name: 'rating_range_max' })
  ratingRangeMax: number;

  @Column({
    type: 'numeric',
    precision: 7,
    scale: 2,
    name: 'reward_multiplier',
  })
  rewardMultiplier: number;

  @Column({ type: 'varchar', length: 7, name: 'band_color' })
  bandColor: string;

  @Column({ type: 'bool', default: () => 'true', name: 'is_active' })
  isActive: boolean;

  @BeforeInsert()
  assignCode(): void {
    if (!this.bandCode) {
      this.bandCode = generatePrefixedCode('PB');
    }
  }
}
