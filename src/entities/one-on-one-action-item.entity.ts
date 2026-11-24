import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { OneOnOneMeetingEntity } from './one-on-one-meeting.entity';

@Entity({ name: 'one_on_one_action_items' })
@Index('idx_o3_action_due', ['dueDate'])
export class OneOnOneActionItemEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'o3_action_item_id' })
  o3ActionItemId: string;

  @Column({ type: 'uuid', name: 'one_on_one_id' })
  oneOnOneId: string;

  @ManyToOne(() => OneOnOneMeetingEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'one_on_one_id' })
  meeting: OneOnOneMeetingEntity;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  /** Role label kept for backward compatibility with existing clients. */
  @Column({
    type: 'varchar',
    length: 30,
    name: 'assigned_to',
    default: 'employee',
  })
  assignedTo: string;

  /**
   * The actual assignee. Resolved from `assignedTo` against the meeting's
   * participants when the caller does not name someone explicitly, so the item
   * can be joined to a user for a cross-meeting "my tasks" view.
   */
  @Column({ type: 'uuid', name: 'assigned_to_user_id', nullable: true })
  assignedToUserId?: string | null;

  @Column({ type: 'date', name: 'due_date', nullable: true })
  dueDate?: string | null;

  @Column({ type: 'timestamptz', name: 'completed_at', nullable: true })
  completedAt?: Date | null;
}
