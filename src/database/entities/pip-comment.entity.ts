// src/database/entities/pip-comment.entity.ts

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { PipEntity } from './pip.entity';

/** A message on a PIP between HR, the manager and the employee. */
@Entity('pip_comments')
@Index('idx_pip_comments_pip', ['pipId'])
export class PipCommentEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'pip_comment_id' })
  pipCommentId: string;

  @Column({ type: 'uuid', name: 'pip_id' })
  pipId: string;

  @Column({ type: 'text', name: 'content' })
  content: string;

  @Column({ type: 'uuid', name: 'author_user_id' })
  authorUserId: string;

  @ManyToOne(() => PipEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pip_id' })
  pip: PipEntity;
}
