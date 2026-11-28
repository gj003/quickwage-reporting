// src/database/entities/review-template-reviewer-block.entity.ts

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { ReviewerAssociationType } from 'src/common/enum';
import { ReviewTemplateEntity } from './review-template.entity';

@Entity('performance_review_template_reviewer_blocks')
@Index('idx_review_template_block_order', ['template_id', 'display_order'])
export class ReviewTemplateReviewerBlockEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  performance_review_template_reviewer_blocks_id: string;

  @Column({ type: 'uuid' })
  template_id: string;

  @Column({ type: 'varchar', length: 50 })
  type: ReviewerAssociationType;

  @Column({ type: 'int' })
  timeline_days: number;

  @Column({ type: 'boolean', default: true })
  required: boolean;

  @Column({ type: 'int', default: 0 })
  display_order: number;

  @ManyToOne(
    () => ReviewTemplateEntity,
    (template) => template.reviewer_blocks,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'template_id' })
  template: ReviewTemplateEntity;
}
