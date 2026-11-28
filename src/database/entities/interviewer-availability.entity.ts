import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'interviewer_availability' })
export class InterviewerAvailabilityEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('increment', { name: 'interviewer_availability_id' })
  interviewerAvailabilityId: number;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.interviewerAvailabilities, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: UserEntity;

  @Column({ name: 'date', type: 'date' })
  date: string;

  @Column({ name: 'slots_json', type: 'text' })
  slotsJson: string;
}
