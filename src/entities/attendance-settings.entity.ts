import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SharedEntity } from './shared.entity';

export enum LeaveDisplayFormat {
  HOURS = 'Hours',
  DAYS = 'Days',
}

export enum AttendanceDetailsDisplay {
  CALENDAR = 'Calendar',
  LIST = 'List',
}

export enum HourFormat {
  TWELVE_HOUR = '12 hour',
  TWENTY_FOUR_HOUR = '24 hour',
}

export enum DisplayWorkHoursAs {
  ONLY_GROSS = 'Only Gross',
  EFFECTIVE = 'Effective',
}

export enum DisplayTimeEntries {
  FIRST_AND_LAST_PUNCH = 'First & Last Punch',
  ALL_PUNCHES = 'All Punches',
}

@Entity('attendance_settings')
export class AttendanceSettingsEntity extends SharedEntity {
  @ApiProperty({ description: 'The unique identifier of the settings' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // General Settings
  @Column({
    type: 'varchar',
    default: LeaveDisplayFormat.HOURS,
  })
  default_leave_display_format: LeaveDisplayFormat;

  @Column({
    type: 'varchar',
    default: AttendanceDetailsDisplay.CALENDAR,
  })
  attendance_details_display: AttendanceDetailsDisplay;

  @Column({
    type: 'varchar',
    default: HourFormat.TWENTY_FOUR_HOUR,
  })
  default_hour_format: HourFormat;

  // Attendance Display Settings
  @Column({
    type: 'varchar',
    default: DisplayWorkHoursAs.ONLY_GROSS,
  })
  display_work_hours_as: DisplayWorkHoursAs;

  @Column({
    type: 'varchar',
    default: DisplayTimeEntries.FIRST_AND_LAST_PUNCH,
  })
  display_time_entries: DisplayTimeEntries;

  // Additional Settings
  @Column({ type: 'int', default: 0 })
  exempt_penalisation_days: number;

  @Column({ type: 'boolean', default: true })
  display_missing_swipes: boolean;

  @Column({ type: 'boolean', default: true })
  display_late_arrivals: boolean;

  // Attendance tracking settings
  @Column({ type: 'boolean', default: true })
  first_clock_in_last_clock_out: boolean;

  // AWOL
  @Column({ type: 'int', default: 0 })
  awol_after_days: number;

  @ApiProperty({ type: [Number], example: [1, 3, 5] })
  @Column({ type: 'simple-json', default: '[]' })
  awol_email_thresholds: number[];

  // Monthly summary mail
  @Column({ type: 'int', default: 26 })
  monthly_summary_mail_day: number;

  @ApiProperty({ required: false })
  @Column({ type: 'uuid', nullable: true })
  company_id: string; // To allow multi-tenant settings
}
