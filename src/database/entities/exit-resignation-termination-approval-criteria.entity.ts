import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExitResignationTerminationApprovalCriteriaType } from 'src/common/enum';
import { SharedEntity } from './shared.entity';
import { ExitResignationTerminationApprovalLevelEntity } from './exit-resignation-termination-approval-level.entity';

@Entity('exit_resignation_termination_approval_criteria')
export class ExitResignationTerminationApprovalCriteriaEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  exit_resignation_termination_approval_criteria_id: string;

  @Column({ type: 'uuid' })
  exit_resignation_termination_approval_level_id: string;

  @Column({ type: 'varchar', length: 20 })
  criteria_type: ExitResignationTerminationApprovalCriteriaType;

  // A role ID is numeric while a user ID is a UUID, so this must support both.
  @Column({ type: 'varchar' })
  criteria_value: string;

  @ManyToOne(
    () => ExitResignationTerminationApprovalLevelEntity,
    (level) => level.criteria,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'exit_resignation_termination_approval_level_id' })
  approval_level: ExitResignationTerminationApprovalLevelEntity;
}
