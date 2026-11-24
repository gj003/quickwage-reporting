// src/database/entities/goal-alignment.entity.ts

import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';

// Links a goal to the higher-level objective(s) it rolls up into. A goal can
// align to more than one parent (e.g. a company goal and a department goal
// at once), which is why this is a separate many-to-many table rather than
// reusing GoalEntity.parentGoalId (which models sub-goal nesting instead).
@Entity({ name: 'goal_alignments' })
@Index('idx_goal_alignments_goal', ['goalId'])
@Index('uq_goal_alignments_pair', ['goalId', 'alignedToGoalId'], {
  unique: true,
  where: '"deleted_at" IS NULL',
})
export class GoalAlignmentEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'goal_alignment_id' })
  goalAlignmentId: string;

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string;

  @Column({ type: 'uuid', name: 'goal_id' })
  goalId: string;

  @Column({ type: 'uuid', name: 'aligned_to_goal_id' })
  alignedToGoalId: string;

  @Column({ type: 'uuid', name: 'created_by', nullable: true })
  createdBy?: string | null;
}
