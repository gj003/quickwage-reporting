import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExitResignationTerminationApprovalType } from 'src/common/enum';
import { SharedEntity } from './shared.entity';
import { ExitResignationTerminationApprovalCriteriaEntity } from './exit-resignation-termination-approval-criteria.entity';
import { ExitResignationTerminationSettingEntity } from './exit-resignation-termination-setting.entity';

@Entity('exit_resignation_termination_approval_levels')
export class ExitResignationTerminationApprovalLevelEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  exit_resignation_termination_approval_level_id: string;

  @Column({ type: 'uuid' })
  exit_resignation_termination_setting_id: string;

  @Column({ type: 'int' })
  level: number;

  @Column({ type: 'varchar', length: 20 })
  type: ExitResignationTerminationApprovalType;

  @Column({ type: 'int', nullable: true })
  send_reminder_in_days?: number;

  @Column({ type: 'int', nullable: true })
  auto_approve_days?: number;

  @ManyToOne(
    () => ExitResignationTerminationSettingEntity,
    (setting) => setting.approval_levels,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'exit_resignation_termination_setting_id' })
  exit_resignation_termination_setting: ExitResignationTerminationSettingEntity;

  @OneToMany(
    () => ExitResignationTerminationApprovalCriteriaEntity,
    (criteria) => criteria.approval_level,
    { cascade: true },
  )
  criteria: ExitResignationTerminationApprovalCriteriaEntity[];
}
