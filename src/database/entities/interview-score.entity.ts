import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { InterviewEntity } from './interview.entity';
import { UserEntity } from './user.entity';
import { ScorecardEntity } from './scorecard.entity';
import { generatePrefixedCode } from 'src/common/utility';

export type InterviewRecommendation =
  'strong_no_hire' | 'no_hire' | 'hire' | 'strong_hire';

@Entity({ name: 'interview_scores' })
export class InterviewScoreEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('increment', { name: 'interview_score_id' })
  interviewScoreId: number;

  @Column({ name: 'score_code', type: 'varchar', length: 32, unique: true })
  scoreCode: string;

  @Column({ name: 'interview_id', type: 'int' })
  interviewId: number;

  @ManyToOne(() => InterviewEntity, (interview) => interview.scores, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'interview_id', referencedColumnName: 'interviewId' })
  interview: InterviewEntity;

  @Column({ name: 'interviewer_id', type: 'uuid', nullable: true })
  interviewerId: string | null;

  @ManyToOne(() => UserEntity, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'interviewer_id', referencedColumnName: 'user_id' })
  interviewer: UserEntity;

  @Column({ name: 'scorecard_id', type: 'int' })
  scorecardId: number;

  @ManyToOne(() => ScorecardEntity, (scorecard) => scorecard.scores, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'scorecard_id', referencedColumnName: 'scorecardId' })
  scorecard: ScorecardEntity;

  @Column({ name: 'answers_json', type: 'text' })
  answersJson: string;

  @Column({
    name: 'overall_rating',
    type: 'numeric',
    precision: 5,
    scale: 2,
    default: 0,
  })
  overallRating: string;

  @Column({ name: 'recommendation', type: 'varchar', length: 20 })
  recommendation: InterviewRecommendation;

  @Column({ name: 'ai_assist_used', type: 'boolean', default: false })
  aiAssistUsed: boolean;

  @Column({ name: 'bias_alerts_json', type: 'text', nullable: true })
  biasAlertsJson?: string | null;

  @BeforeInsert()
  assignCode(): void {
    if (!this.scoreCode) {
      this.scoreCode = generatePrefixedCode('SCRS');
    }
  }
}
