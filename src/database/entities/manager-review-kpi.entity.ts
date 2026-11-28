// src/database/entities/manager-review-kpi.entity.ts
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { ManagerReviewKraEntity } from './manager-review-kra.entity';
import { GoalKpiEntity } from './goal-kpi.entity';

@Entity('manager_review_kpis')
@Index('idx_manager_review_kpi_kra', ['manager_review_kra_id'])
export class ManagerReviewKpiEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  manager_review_kpi_id: string;

  @Column({ type: 'uuid' })
  manager_review_kra_id: string;

  @Column({ type: 'uuid' })
  goal_kpi_id: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  manager_rating?: string | null;

  @ManyToOne(() => ManagerReviewKraEntity, (kra) => kra.kpis, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'manager_review_kra_id' })
  managerReviewKra: ManagerReviewKraEntity;

  @ManyToOne(() => GoalKpiEntity, (kpi) => kpi.goal_kpis_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'goal_kpi_id' })
  goalKpi: GoalKpiEntity;
}
