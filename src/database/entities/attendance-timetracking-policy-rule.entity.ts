import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { AttendanceTimeTrackingPolicyEntity } from './attendance-timetracking-policy.entity';
import { TimeTrackingPolicyRuleCriteriaType } from 'src/common/enum';

@Entity('attendance_timetracking_policy_rule')
export class AttendanceTimeTrackingPolicyRuleEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'attendance_timetracking_policy_rule_id',
  })
  attendance_timetracking_policy_rule_id: string;

  @Column({ type: 'uuid' })
  attendance_timetracking_policy_id: string;

  @Column({ type: 'varchar', length: 50 })
  criteria_type: TimeTrackingPolicyRuleCriteriaType;

  @Column({ type: 'varchar', length: 255 })
  criteria_type_value: string;

  @Column({ type: 'boolean', default: true })
  allow: boolean;

  @ManyToOne(() => AttendanceTimeTrackingPolicyEntity, (p) => p.rules, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'attendance_timetracking_policy_id' })
  policy: AttendanceTimeTrackingPolicyEntity;
}
