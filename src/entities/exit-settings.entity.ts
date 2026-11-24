import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { CompanyEntity } from './company.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'exit_settings' })
@Index('uq_exit_settings_company', ['companyId'], { unique: true })
@Index('uq_exit_settings_code', ['settingsCode'], { unique: true })
export class ExitSettingsEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'exit_settings_id' })
  exitSettingsId: string;

  @Column({ name: 'auto_inc', type: 'int' })
  @Generated('increment')
  autoInc: number;

  @Column({ name: 'settings_code', type: 'varchar', unique: true })
  settingsCode: string;

  @Column({ name: 'company_id', type: 'uuid' })
  companyId: string;

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @Column({ name: 'show_exit_progress', type: 'boolean', default: false })
  showExitProgress: boolean;

  @Column({ name: 'allow_task_updates', type: 'boolean', default: false })
  allowTaskUpdates: boolean;

  @Column({
    name: 'custom_employee_message',
    type: 'varchar',
    length: 2000,
    nullable: true,
  })
  customEmployeeMessage?: string | null;

  @Column({
    name: 'visible_resignation_overview',
    type: 'boolean',
    default: true,
  })
  visibleResignationOverview: boolean;

  @Column({ name: 'visible_exit_tasks', type: 'boolean', default: true })
  visibleExitTasks: boolean;

  @Column({ name: 'visible_final_settlement', type: 'boolean', default: true })
  visibleFinalSettlement: boolean;

  @Column({
    name: 'visible_exit_survey_status',
    type: 'boolean',
    default: true,
  })
  visibleExitSurveyStatus: boolean;

  @Column({ name: 'visible_hr_contact', type: 'boolean', default: true })
  visibleHrContact: boolean;

  @BeforeInsert()
  assignSettingsCode(): void {
    if (!this.settingsCode) {
      this.settingsCode = generatePrefixedCode('EXITSET');
    }
  }
}
