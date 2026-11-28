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
import { generatePrefixedCode } from 'src/common/utility';
import { CompanyEntity } from './company.entity';
import { CompanyHolidayEntity } from './company-holiday.entity';
import { SharedEntity } from './shared.entity';

@Entity('holiday_calendars')
@Index('idx_holiday_calendars_company', ['company_id'])
export class HolidayCalendarEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  holiday_calendar_id: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  holiday_calendar_code: string;

  @BeforeInsert()
  assignCalendarCode(): void {
    if (!this.holiday_calendar_code)
      this.holiday_calendar_code = generatePrefixedCode('HCAL', 6);
  }

  @Column({ type: 'varchar', length: 150 })
  calendar_name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description: string | null;

  @Column({ type: 'uuid' })
  company_id: string;

  @ManyToOne(() => CompanyEntity, (company) => company.holiday_calendars, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @OneToMany(() => CompanyHolidayEntity, (holiday) => holiday.holiday_calendar)
  holidays: CompanyHolidayEntity[];
}
