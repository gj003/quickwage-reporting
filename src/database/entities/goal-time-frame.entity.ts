// src/database/entities/goal-time-frame.entity.ts

import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';
import {
  GoalCycleFrequency,
  GoalTimeFrameReminderFrequency,
} from 'src/common/enum';

@Entity({ name: 'goal_time_frames' })
@Index('idx_goal_time_frames_company', ['companyId'])
export class GoalTimeFrameEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'goal_time_frame_id' })
  goalTimeFrameId: string;

  @Column({ type: 'varchar', name: 'goal_time_frame_code', unique: true })
  goalTimeFrameCode: string;

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: GoalCycleFrequency.QUARTERLY,
  })
  frequency: GoalCycleFrequency;

  @Column({ type: 'date', name: 'start_date' })
  startDate: string;

  @Column({ type: 'date', name: 'end_date' })
  endDate: string;

  @Column({
    type: 'varchar',
    name: 'reminder_frequency',
    length: 20,
    default: GoalTimeFrameReminderFrequency.WEEKLY,
  })
  reminderFrequency: GoalTimeFrameReminderFrequency;

  @Column({ type: 'varchar', length: 50, default: 'active' })
  status: string;

  @Column({ type: 'uuid', name: 'created_by', nullable: true })
  createdBy?: string | null;

  @Column({ type: 'uuid', name: 'updated_by', nullable: true })
  updatedBy?: string | null;

  @BeforeInsert()
  ensureDefaults(): void {
    if (!this.goalTimeFrameCode) {
      this.goalTimeFrameCode = generatePrefixedCode('GOALTF');
    }

    if (!this.status) {
      this.status = 'active';
    }
  }
}
