// src/database/entities/user-password-change.entity.ts

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { UserEntity } from './user.entity';

@Entity('password_reset')
export class PasswordResetEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'varchar' })
  otp: string;

  @Column({ type: 'timestamp' })
  expires_at: Date;

  // relations

  @OneToOne(() => UserEntity, (rel) => rel.user_id)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
