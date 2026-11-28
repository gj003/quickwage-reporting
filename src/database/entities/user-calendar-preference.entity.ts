import { generatePrefixedCode } from 'src/common/utility';
import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { CompanyEntity } from './company.entity';
import { UserEntity } from './user.entity';

@Index(
  'uq_user_calendar_preference_company_code',
  ['companyId', 'preferenceCode'],
  { unique: true },
)
@Entity('user_calendar_preferences')
@Index('uq_user_calendar_preference_tenant_user', ['companyId', 'userId'], {
  unique: true,
})
export class UserCalendarPreferenceEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'user_calendar_preference_id' })
  userCalendarPreferenceId: string;

  @Column({ name: 'preference_code', type: 'varchar', length: 32 })
  preferenceCode: string;

  @BeforeInsert()
  assignCode(): void {
    if (!this.preferenceCode)
      this.preferenceCode = generatePrefixedCode('CALPREF', 8);
  }

  @Column({ name: 'company_id', type: 'uuid' }) companyId: string;
  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @Column({ name: 'user_id', type: 'uuid' }) userId: string;
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: UserEntity;

  @Column({ name: 'calendar_enabled', type: 'boolean', default: true })
  calendarEnabled: boolean;
  @Column({ name: 'mail_enabled', type: 'boolean', default: true })
  mailEnabled: boolean;
}
