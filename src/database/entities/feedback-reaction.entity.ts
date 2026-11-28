import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';

@Entity({ name: 'feedback_reactions' })
export class FeedbackReactionEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'feedback_reaction_id' })
  feedbackReactionId: string;

  @Column({ type: 'uuid', name: 'feedback_id' })
  feedbackId: string;

  @Column({ type: 'uuid', name: 'employee_id' })
  employeeId: string;

  @Column({ type: 'varchar', length: 30, default: 'like' })
  reactionType: string;

  @Column({ type: 'text', nullable: true })
  note?: string | null;
}
