import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { GoalEntity } from './goal.entity';
import { UserEntity } from './user.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'goal_progress_history' })
@Index('idx_goal_progress_history_goal', ['goalId'])
@Index('idx_goal_progress_history_employee', ['employeeId'])
export class GoalProgressHistoryEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'goal_progress_history_id' })
  goalProgressHistoryId: string;

  @Column({ type: 'varchar', length: 30, name: 'history_code', unique: true })
  historyCode: string;

  @Column({ type: 'uuid', name: 'goals_id' })
  goalId: string;

  @Column({ type: 'uuid', name: 'employee_id' })
  employeeId: string;

  @Column({ type: 'int', name: 'progress_percent' })
  progressPercent: number;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  note?: string | null;

  @Column({
    type: 'text',
    array: true,
    name: 'evidence_urls',
    default: () => "'{}'",
  })
  evidenceUrls: string[];

  @ManyToOne(() => GoalEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'goals_id' })
  goal?: GoalEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id' })
  employee?: UserEntity;

  @BeforeInsert()
  assignCode(): void {
    if (!this.historyCode) {
      this.historyCode = generatePrefixedCode('GPH');
    }
  }
}
