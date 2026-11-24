// src/database/entities/review-template.entity.ts

import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  VersionColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { PerformanceReviewType } from 'src/common/enum';
import { ReviewCycleEntity } from './review-cycle.entity';
import { ReviewTemplateReviewerBlockEntity } from './review-template-reviewer-block.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { ReviewerBlockSnapshot } from 'src/modules/performance/review-templates/dto/reviewer-block.dto';

@Entity('performance_review_templates')
@Index('idx_review_template_company_category', ['company_id', 'category'])
export class ReviewTemplateEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  performance_review_templates_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 100 })
  category: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'varchar', length: 50 })
  review_type: PerformanceReviewType;

  @Column({ type: 'varchar', length: 100, nullable: true })
  recommended_role?: string | null;

  @Column({ type: 'boolean', default: false })
  parallel_reviews: boolean;

  @Column({ type: 'boolean', default: false })
  auto_progression: boolean;

  @Column({ type: 'boolean', default: false })
  early_access_to_forms: boolean;

  @Column({ type: 'boolean', default: false })
  automatic_reminders: boolean;

  @Column({ type: 'int', nullable: true })
  reminder_frequency_days?: number | null;

  @Column({ type: 'boolean', default: false })
  anonymous_peer_feedback: boolean;

  @Column({ type: 'boolean', default: false })
  show_results_immediately: boolean;

  @Column({ type: 'boolean', default: false })
  require_calibration: boolean;

  @Column({ type: 'boolean', default: false })
  bell_curve_enforcement: boolean;

  @Column({ type: 'varchar', array: true, nullable: true })
  tags?: string[] | null;

  @Column({ type: 'jsonb', nullable: true })
  reviewer_blocks_snapshot?: ReviewerBlockSnapshot[] | null;

  @Column({ type: 'uuid', nullable: true })
  created_by?: string | null;

  @Column({ type: 'uuid', nullable: true })
  updated_by?: string | null;

  @VersionColumn()
  version: number;

  @OneToMany(
    () => ReviewTemplateReviewerBlockEntity,
    (block) => block.template,
    { cascade: true },
  )
  reviewer_blocks?: ReviewTemplateReviewerBlockEntity[];

  @OneToMany(() => ReviewCycleEntity, (cycle) => cycle.template)
  cycles?: ReviewCycleEntity[];

  @BeforeInsert()
  assignCode(): void {
    if (!this.code) {
      this.code = generatePrefixedCode('PRT');
    }
  }
}
