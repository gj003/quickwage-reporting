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
import { UserEntity } from './user.entity';
import {
  EmployeeExitRequestStatus,
  ExitInitiationReason,
} from 'src/common/enum';
import { EmployeeExitTaskEntity } from './employee-exit-task.entity';
import { EmployeeExitRequestTrackingEntity } from './employee-exit-request-tracking.entity';
import { EmployeeExitRequestActivityEntity } from './employee-exit-request-activity.entity';
import { EmployeeExitSurveyFormAnswerEntity } from './employee-exit-survey-form-answer.entity';
import { EmployeeExitReplacementManagerEntity } from './employee-exit-replacement-manager.entity';

@Entity({ name: 'employee_exit_request' })
@Index('uq_employee_exit_request_code', ['displayCode'], { unique: true })
@Index('idx_employee_exit_request_employee', ['employeeId'])
export class EmployeeExitRequestEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'employee_exit_request_id' })
  employeeExitRequestId: string;

  @Column({ name: 'display_code', type: 'varchar', unique: true })
  displayCode: string;

  @Column({ name: 'employee_id', type: 'uuid' })
  employeeId: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  reason?: string | null;

  @Column({ name: 'last_working_day', type: 'date' })
  lastWorkingDay: string;

  @Column({
    name: 'additional_notes',
    type: 'varchar',
    length: 2000,
    nullable: true,
  })
  additionalNotes?: string | null;

  @Column({
    name: 'resignation_letter_url',
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  resignationLetterUrl?: string | null;

  @Column({
    type: 'varchar',
    length: 30,
    default: EmployeeExitRequestStatus.PENDING,
  })
  status: EmployeeExitRequestStatus;

  @Column({
    name: 'initiation_reason',
    type: 'varchar',
    length: 30,
  })
  initiationReason: ExitInitiationReason;

  @Column({
    name: 'discussion_summary',
    type: 'varchar',
    length: 2000,
    nullable: true,
  })
  discussionSummary?: string | null;

  @Column({ name: 'resignation_notice_date', type: 'date', nullable: true })
  resignationNoticeDate?: string | null;

  @Column({
    name: 'preferred_last_working_date',
    type: 'date',
    nullable: true,
  })
  preferredLastWorkingDate?: string | null;

  @Column({
    name: 'ok_to_rehire',
    type: 'boolean',
    nullable: true,
  })
  okToRehire?: boolean | null;

  @Column({
    name: 'serving_notice_period',
    type: 'boolean',
    default: false,
  })
  servingNoticePeriod: boolean;

  @ManyToOne(() => UserEntity, (user) => user.employeeExitRequests)
  @JoinColumn({ name: 'employee_id', referencedColumnName: 'user_id' })
  employee: UserEntity;

  @OneToMany(() => EmployeeExitTaskEntity, (task) => task.employeeExitRequest)
  exitTasks: EmployeeExitTaskEntity[];

  @OneToMany(
    () => EmployeeExitRequestTrackingEntity,
    (tracking) => tracking.employeeExitRequest,
  )
  trackingHistory: EmployeeExitRequestTrackingEntity[];

  @OneToMany(
    () => EmployeeExitRequestActivityEntity,
    (activity) => activity.employeeExitRequest,
  )
  activities: EmployeeExitRequestActivityEntity[];

  @OneToMany(
    () => EmployeeExitSurveyFormAnswerEntity,
    (answer) => answer.employeeExitRequest,
  )
  surveyAnswers: EmployeeExitSurveyFormAnswerEntity[];

  @OneToMany(
    () => EmployeeExitReplacementManagerEntity,
    (replacement) => replacement.employeeExitRequest,
  )
  replacementManagers: EmployeeExitReplacementManagerEntity[];

  @BeforeInsert()
  assignDisplayCode(): void {
    if (!this.displayCode) {
      this.displayCode = generatePrefixedCode('EXITREQ');
    }
  }
}
