import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { JobListingEntity } from './job-listing.entity';
import { CandidateEntity } from './candidate.entity';
import { HiringFlowEntity } from './hiring-flow.entity';
import { HiringStageEntity } from './hiring-stage.entity';
import { CompanyEntity } from './company.entity';
import { UserEntity } from './user.entity';
import { InterviewScoreEntity } from './interview-score.entity';

export type InterviewStatus =
  'scheduled' | 'live' | 'completed' | 'cancelled' | 'no_show';

export type InterviewLocationType = 'room' | 'meet' | 'teams' | 'zoom';

@Index('idx_interviews_company_calendar', [
  'companyId',
  'calendarSyncStatus',
  'deleted_at',
])
@Entity({ name: 'interviews' })
export class InterviewEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('increment', { name: 'interview_id' })
  interviewId: number;

  @Column({ name: 'interview_code', type: 'varchar', length: 32, unique: true })
  interviewCode: string;

  @Column({ name: 'candidate_id', type: 'uuid' })
  candidateId: string;

  @ManyToOne(() => CandidateEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id', referencedColumnName: 'candidate_id' })
  candidate: CandidateEntity;

  @Column({ name: 'job_listing_id', type: 'uuid' })
  jobListingId: string;

  @ManyToOne(() => JobListingEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'job_listing_id',
    referencedColumnName: 'job_listing_id',
  })
  jobListing: JobListingEntity;

  @Column({ name: 'flow_id', type: 'uuid' })
  flowId: string;

  @ManyToOne(() => HiringFlowEntity, (flow) => flow.interviews, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'flow_id', referencedColumnName: 'hiringFlowId' })
  flow: HiringFlowEntity;

  @Column({ name: 'stage_id', type: 'uuid' })
  stageId: string;

  @ManyToOne(() => HiringStageEntity, (stage) => stage.interviews, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'stage_id', referencedColumnName: 'hiringStageId' })
  stage: HiringStageEntity;

  @Column({ name: 'title', type: 'varchar', length: 200 })
  title: string;

  @Column({ name: 'start_at', type: 'timestamptz' })
  startAt: Date;

  @Column({ name: 'end_at', type: 'timestamptz' })
  endAt: Date;

  @Column({ name: 'duration_min', type: 'int' })
  durationMin: number;

  @Column({ name: 'location_type', type: 'varchar', length: 20 })
  locationType: InterviewLocationType;

  @Column({
    name: 'location_detail',
    type: 'varchar',
    length: 250,
    nullable: true,
  })
  locationDetail?: string | null;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 20,
    default: 'scheduled',
  })
  status: InterviewStatus;

  @Column({ name: 'interviewers_json', type: 'text' })
  interviewersJson: string;

  @Column({ name: 'meeting_url', type: 'varchar', length: 500, nullable: true })
  meetingUrl?: string | null;

  @Column({
    name: 'calendar_event_id',
    type: 'varchar',
    length: 128,
    nullable: true,
  })
  calendarEventId?: string | null;

  @OneToMany(() => InterviewScoreEntity, (score) => score.interview, {
    cascade: false,
  })
  scores: InterviewScoreEntity[];

  @Column({ name: 'company_id', type: 'uuid', nullable: true }) companyId:
    string | null;
  @ManyToOne(() => CompanyEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;
  @Column({ name: 'organiser_user_id', type: 'uuid', nullable: true })
  organiserUserId: string | null;
  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'organiser_user_id', referencedColumnName: 'user_id' })
  organiser: UserEntity;
  @Column({
    name: 'organiser_email',
    type: 'varchar',
    length: 254,
    nullable: true,
  })
  organiserEmail: string | null;
  @Column({
    name: 'calendar_request_id',
    type: 'uuid',
    default: () => 'uuid_generate_v4()',
  })
  calendarRequestId: string;
  @Column({
    name: 'calendar_provider',
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  calendarProvider: string | null;
  @Column({
    name: 'conference_provider',
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  conferenceProvider: string | null;
  @Column({
    name: 'conference_meeting_id',
    type: 'varchar',
    length: 128,
    nullable: true,
  })
  conferenceMeetingId: string | null;
  @Column({
    name: 'calendar_sync_status',
    type: 'varchar',
    length: 20,
    default: 'pending',
  })
  calendarSyncStatus: string;
  @Column({
    name: 'calendar_sync_error',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  calendarSyncError: string | null;

  @BeforeInsert()
  assignCode(): void {
    if (!this.interviewCode) {
      this.interviewCode = generatePrefixedCode('INTRV');
    }
  }
}
