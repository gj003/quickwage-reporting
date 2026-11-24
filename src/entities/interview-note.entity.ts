import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InterviewEntity } from './interview.entity';

export enum InterviewNoteVisibility {
  TEAM = 'TEAM',
  PRIVATE = 'PRIVATE',
}

export interface InterviewNoteAttachment {
  id?: string;
  name: string;
  url?: string;
  type?: string;
  metadata?: Record<string, any>;
}

export interface InterviewNoteInsight {
  title: string;
  evidence: string[];
  recommendation: string;
  scoreImpact?: 'positive' | 'neutral' | 'negative';
}

@Entity({ name: 'interview_notes' })
export class InterviewNoteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'interview_id', type: 'int' })
  interviewId: number;

  @ManyToOne(() => InterviewEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'interview_id',
    referencedColumnName: 'interviewId',
  })
  interview: InterviewEntity;

  @Column({ name: 'author_id', type: 'int' })
  authorId: number;

  @Column({
    name: 'visibility',
    type: 'varchar',
    default: InterviewNoteVisibility.TEAM,
  })
  visibility: InterviewNoteVisibility;

  @Column({ type: 'text' })
  text: string;

  @Column({
    type: 'text',
    array: true,
    default: () => 'ARRAY[]::text[]',
  })
  tags: string[];

  @Column({
    type: 'jsonb',
    nullable: true,
    default: () => "'[]'::jsonb",
  })
  attachments: InterviewNoteAttachment[];

  @Column({
    name: 'ai_insights',
    type: 'jsonb',
    nullable: true,
    default: () => "'[]'::jsonb",
  })
  aiInsights: InterviewNoteInsight[];

  @Column({ type: 'int', nullable: true })
  rating?: number | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
