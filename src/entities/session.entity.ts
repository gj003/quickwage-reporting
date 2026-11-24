// src/database/entities/external-api-logs.entity.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { SharedEntity } from './shared.entity';

@Entity('session')
export class SessionEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Unique(['user_id'])
  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @Column({ type: 'varchar', length: 6, nullable: true })
  otp: string;

  @Column({ type: 'timestamptz', nullable: true })
  timestamp: Date;

  @Column({ type: 'timestamptz', nullable: true })
  last_login_at: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  access_token_hash?: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  access_token_issued_at?: Date | null;

  // relations

  @OneToOne(() => UserEntity, (rel) => rel.session, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
