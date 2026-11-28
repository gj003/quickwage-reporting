// src/database/entities/user-notification.entity.ts

import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

/** One item in a person's notification bell. */
@Entity('user_notifications')
@Index('idx_user_notifications_inbox', ['company_id', 'user_id', 'created_at'])
export class UserNotificationEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  user_notifications_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'varchar', length: 40 })
  module: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  /** In-app path to open; null when there is nowhere useful to go. */
  @Column({ type: 'varchar', length: 255, nullable: true })
  action_link?: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  read_at?: Date | null;
}
