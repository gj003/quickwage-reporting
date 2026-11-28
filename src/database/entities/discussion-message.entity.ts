import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DiscussionThreadEntity } from './discussion-thread.entity';

export interface DiscussionMessageReactions {
  [emoji: string]: number[];
}

@Entity({ name: 'discussion_messages' })
export class DiscussionMessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'thread_id', type: 'uuid' })
  threadId: string;

  @ManyToOne(() => DiscussionThreadEntity, (thread) => thread.messages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'thread_id', referencedColumnName: 'id' })
  thread: DiscussionThreadEntity;

  @Column({ name: 'author_id', type: 'int' })
  authorId: number;

  @Column({ type: 'text' })
  text: string;

  @Column({
    type: 'jsonb',
    nullable: true,
    default: () => "'{}'::jsonb",
  })
  reactions: DiscussionMessageReactions;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
