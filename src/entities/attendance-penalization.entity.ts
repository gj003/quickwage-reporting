import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { UserEntity } from './user.entity';
import { AttendanceEntity } from './attendance.entity';
import { PenalizationPolicyEntity } from './penalization-policy.entity';
import {
  AttendancePenalizationStatus,
  PenalizationDeductionType,
  PenalizationRuleSection,
} from 'src/common/enum';

@Entity('attendance_penalizations')
@Unique('UQ_attendance_penalization_attendance_rule', [
  'attendance_id',
  'rule_section',
])
export class AttendancePenalizationEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'integer' })
  attendance_id: number;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  policy_id: string;

  @Column({ type: 'varchar' })
  rule_section: PenalizationRuleSection;

  @Column({ type: 'varchar' })
  penalty_action: PenalizationDeductionType;

  @Column({ type: 'numeric', precision: 8, scale: 2 })
  penalty_value: string;

  @Column({ type: 'varchar', length: 50 })
  unit: string;

  @Column({ type: 'date' })
  incident_date: Date;

  @Column({ type: 'integer', nullable: true })
  leave_plan_leave_type_id: number | null;

  @Column({ type: 'uuid', nullable: true })
  employee_leave_ledger_id: string | null;

  @Column({ type: 'text', nullable: true })
  remarks: string | null;

  @Column({ type: 'jsonb', nullable: true })
  meta: Record<string, unknown> | null;

  @Column({
    type: 'varchar',
    default: AttendancePenalizationStatus.ACTIVE,
  })
  status: AttendancePenalizationStatus;

  @Column({ type: 'timestamp', nullable: true })
  voided_at: Date | null;

  @Column({ type: 'uuid', nullable: true })
  voided_by: string | null;

  @Column({ type: 'text', nullable: true })
  voided_reason: string | null;

  @Column({ type: 'uuid', nullable: true })
  voided_via_request_id: string | null;

  @ManyToOne(() => AttendanceEntity, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'attendance_id' })
  attendance: AttendanceEntity;

  @ManyToOne(() => UserEntity, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => PenalizationPolicyEntity, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'policy_id' })
  policy: PenalizationPolicyEntity;
}
