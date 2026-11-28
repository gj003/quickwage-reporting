// src/database/entities/external-api-logs.entity.ts

import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity as UserEntity } from './user.entity';
import { SharedEntity } from './shared.entity';

@Entity('flow-stage')
export class FlowStageEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ type: 'uuid', nullable: true })
  user_id: string;

  @Column({
    type: 'jsonb',
  })
  stages: Record<string, any>;

  @Column({ type: 'timestamp', nullable: true })
  public completionDate: Date;

  // relations

  @OneToOne(() => UserEntity, (rel) => rel.user_id, { onDelete: 'CASCADE' }) // Define ManyToOne relationship
  @JoinColumn({ name: 'user_id' }) // Define the foreign key column
  user: UserEntity;
}
