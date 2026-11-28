import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SharedEntity } from './shared.entity';
import { PenalizationDeductionType } from 'src/common/enum';
import { PenalizationPolicyEntity } from './penalization-policy.entity';

@Entity('penalization_policy_versions')
@Index(
  'UQ_penalization_policy_versions_policy_version',
  ['policy_id', 'version_no'],
  {
    unique: true,
  },
)
export class PenalizationPolicyVersionEntity extends SharedEntity {
  @ApiProperty({ description: 'Unique identifier of this version' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Reference to the parent penalization policy' })
  @Column({ type: 'uuid' })
  policy_id: string;

  @ManyToOne(() => PenalizationPolicyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'policy_id' })
  policy: PenalizationPolicyEntity;

  @ApiProperty({ description: 'Version number (auto-incremented per policy)' })
  @Column({ type: 'int' })
  version_no: number;

  @ApiProperty({ description: 'Date from which this version takes effect' })
  @Column({ type: 'date' })
  effective_from: string;

  @ApiProperty({
    description: 'User who created this version',
    required: false,
  })
  @Column({ type: 'uuid', nullable: true })
  created_by: string | null;

  @ApiProperty({
    description: 'User who last updated this version',
    required: false,
  })
  @Column({ type: 'uuid', nullable: true })
  updated_by: string | null;

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

  @ApiProperty({ description: 'Rules for no attendance', required: false })
  @Column({ type: 'simple-json', nullable: true })
  no_attendance_rules: any;

  @ApiProperty({ description: 'Rules for late arrival', required: false })
  @Column({ type: 'simple-json', nullable: true })
  late_arrival_rules: any;

  @ApiProperty({
    description: 'Rules for work hours shortage',
    required: false,
  })
  @Column({ type: 'simple-json', nullable: true })
  work_hours_rules: any;

  @ApiProperty({ description: 'Rules for missing logs', required: false })
  @Column({ type: 'simple-json', nullable: true })
  missing_logs_rules: any;
}
