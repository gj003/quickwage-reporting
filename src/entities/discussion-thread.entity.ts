import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DiscussionMessageEntity } from './discussion-message.entity';

export enum DiscussionEntityType {
  INTERVIEW = 'INTERVIEW',
  CANDIDATE = 'CANDIDATE',
}

@Entity({ name: 'discussion_threads' })
export class DiscussionThreadEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({
    type: 'varchar',
    default: DiscussionEntityType.INTERVIEW,
  })
  entity: DiscussionEntityType;

  @Column({ name: 'entity_id', type: 'int' })
  entityId: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => DiscussionMessageEntity, (message) => message.thread, {
    cascade: ['remove'],
  })
  messages: DiscussionMessageEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
