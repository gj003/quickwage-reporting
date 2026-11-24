import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SharedEntity } from './shared.entity';
import { PenalizationDeductionType } from 'src/common/enum';
import {
  NoAttendanceRulesDto,
  LateArrivalRulesDto,
  WorkHoursRulesDto,
  MissingLogsRulesDto,
} from 'src/modules/Leave-and-attandance/Attendance-Settings/penalization-policy.dto';

@Entity('penalization_policies')
export class PenalizationPolicyEntity extends SharedEntity {
  @ApiProperty({
    description: 'The unique identifier of the penalization policy',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Name of the policy' })
  @Column({ type: 'varchar', length: 255 })
  policy_name: string;

  @ApiProperty({
    enum: PenalizationDeductionType,
    description: 'How penalties are deducted',
  })
  @Column({
    type: 'varchar',
    default: PenalizationDeductionType.LOSS_OF_PAY,
  })
  deduction_type: PenalizationDeductionType;

  @ApiProperty({ type: [String], description: 'Order of paid leave deduction' })
  @Column({ type: 'simple-json', default: '[]' })
  leave_deduction_order: string[];

  @ApiProperty({
    description:
      'If employee is under notice period, consider all penalties as loss of pay',
  })
  @Column({ type: 'boolean', default: true })
  consider_notice_period_as_lop: boolean;

  @ApiProperty({ description: 'Buffer period in days after the incident' })
  @Column({ type: 'int', default: 2 })
  buffer_period: number;

  @ApiProperty({
    type: NoAttendanceRulesDto,
    description: 'Rules for no attendance',
    required: false,
  })
  @Column({ type: 'simple-json', nullable: true })
  no_attendance_rules: any;

  @ApiProperty({
    type: LateArrivalRulesDto,
    description: 'Rules for late arrival',
    required: false,
  })
  @Column({ type: 'simple-json', nullable: true })
  late_arrival_rules: any;

  @ApiProperty({
    type: WorkHoursRulesDto,
    description: 'Rules for work hours shortage',
    required: false,
  })
  @Column({ type: 'simple-json', nullable: true })
  work_hours_rules: any;

  @ApiProperty({
    type: MissingLogsRulesDto,
    description: 'Rules for missing logs',
    required: false,
  })
  @Column({ type: 'simple-json', nullable: true })
  missing_logs_rules: any;

  @ApiProperty({ description: 'Company identifier' })
  @Column({ type: 'uuid' })
  company_id: string;

  @ApiProperty({
    description: 'Whether this policy is the default policy for the company',
  })
  @Column({ type: 'boolean', default: false })
  is_default: boolean;

  @ApiProperty({ description: 'Whether this policy is archived' })
  @Column({ type: 'boolean', default: false })
  is_archived: boolean;

  @ApiProperty({
    description: 'Include criteria for rule-based auto-assignment',
    required: false,
  })
  @Column({ type: 'jsonb', nullable: true })
  assignment_include_rules: AssignmentRuleCriteria[] | null;

  @ApiProperty({
    description: 'Exclude criteria for rule-based auto-assignment',
    required: false,
  })
  @Column({ type: 'jsonb', nullable: true })
  assignment_exclude_rules: AssignmentRuleCriteria[] | null;
}

export interface AssignmentRuleCriteria {
  group_type: string;
  value_ids: string[];
}
