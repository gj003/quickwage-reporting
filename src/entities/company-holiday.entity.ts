// src/database/entities/company-holiday.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  BeforeInsert,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';
import { CompanyHolidaySession, CompanyHolidayType } from 'src/common/enum';
import { HRMS_AddressEntity } from './hrms-address.entity';
import { HolidayCalendarEntity } from './holiday-calendar.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('company_holidays')
@Index('idx_company_holidays_company_date', ['company_id', 'date'])
@Index('idx_company_holidays_company_type', ['company_id', 'holidayType'])
@Index('idx_company_holidays_company_calendar', [
  'company_id',
  'holiday_calendar_id',
])
export class CompanyHolidayEntity extends SharedEntity {
  @PrimaryGeneratedColumn({ name: 'holiday_id' })
  holiday_id: number;

  @Column({ type: 'varchar', length: 30, unique: true })
  holiday_code: string;

  @BeforeInsert()
  assignHolidayCode(): void {
    if (!this.holiday_code) this.holiday_code = generatePrefixedCode('HOL', 6);
  }

  @Column({ length: 150, type: 'varchar' })
  name: string;

  @Column({ nullable: true, length: 255, type: 'varchar' })
  description: string;

  @Column({ type: 'date' })
  date: string;

  // ===== Holiday Category =====

  @Column({
    type: 'varchar',
    default: CompanyHolidayType.PUBLIC,
  })
  holidayType: CompanyHolidayType;

  // ===== Mandatory or Optional =====

  @Column({ default: false, type: 'boolean' })
  isMandatory: boolean;
  // true = office closed
  // false = employee can choose (floating holiday)

  // ===== Payroll Impact =====

  @Column({ default: false, type: 'boolean' })
  isPaid: boolean;
  // unpaid holiday support

  // ===== Partial2,  Day Support =====

  @Column({ default: false, type: 'boolean' })
  isHalfDay: boolean;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  halfDaySession: CompanyHolidaySession;

  // ===== Recurring Support =====

  @Column({ default: false, type: 'boolean' })
  isRecurring: boolean;
  // eg: 15 Aug every year

  // ===== Government / Emergency =====

  @Column({ default: false, type: 'boolean' })
  isGovernmentDeclared: boolean;
  // Election day, emergency shutdown

  // ===== Location / Region =====

  @Column({ nullable: true, type: 'int' })
  location_id: number;

  // ===== Company Mapping =====

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid', nullable: true })
  holiday_calendar_id: string | null;

  @ManyToOne(() => CompanyEntity, (rel) => rel.holidays, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @ManyToOne(() => HolidayCalendarEntity, (calendar) => calendar.holidays, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'holiday_calendar_id' })
  holiday_calendar: HolidayCalendarEntity | null;

  @ManyToOne(() => HRMS_AddressEntity, (rel) => rel.holidays, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'location_id' })
  hrms_address: HRMS_AddressEntity;
}
