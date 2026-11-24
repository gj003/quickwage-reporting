// src/database/entities/manager-review-kra.entity.ts
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { ManagerReviewEntity } from './manager-review.entity';
import { GoalKraEntity } from './goal-kra.entity';
import { ManagerReviewKpiEntity } from './manager-review-kpi.entity';

@Entity('manager_review_kras')
@Index('idx_manager_review_kras_review', ['manager_reviews_id'])
export class ManagerReviewKraEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  manager_review_kra_id: string;

  @Column({ type: 'uuid' })
  manager_reviews_id: string;

  @Column({ type: 'uuid' })
  goal_kra_id: string;

  @Column({ type: 'text', nullable: true })
  manager_comment?: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  manager_rating?: string | null;

  @ManyToOne(() => ManagerReviewEntity, (review) => review.kras, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'manager_reviews_id' })
  managerReview: ManagerReviewEntity;

  @ManyToOne(() => GoalKraEntity, (kra) => kra.goal_kras_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'goal_kra_id' })
  kra: GoalKraEntity;

  @OneToMany(() => ManagerReviewKpiEntity, (kpi) => kpi.managerReviewKra, {
    cascade: true,
  })
  kpis: ManagerReviewKpiEntity[];
}
