import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'skill_assessments' })
@Index('idx_skill_assessment_employee', ['employeeId'])
@Index('idx_skill_assessment_skill', ['skillId'])
export class SkillAssessmentEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'skill_assessment_id' })
  skillAssessmentId: string;

  @Column({ type: 'varchar', name: 'assessment_code', unique: true })
  assessmentCode: string;

  /**
   * Taken from the skill. Null only on a row whose skill no longer exists;
   * such rows belong to no company and are unreachable.
   */
  @Column({ type: 'uuid', name: 'company_id', nullable: true })
  companyId?: string | null;

  @Column({ type: 'uuid', name: 'employee_id' })
  employeeId: string;

  @Column({ type: 'uuid', name: 'manager_id', nullable: true })
  managerId?: string | null;

  @Column({ type: 'uuid', name: 'skill_id' })
  skillId: string;

  @Column({ type: 'int', name: 'expected_level' })
  expectedLevel: number;

  @Column({ type: 'int', name: 'self_level', nullable: true })
  selfLevel?: number | null;

  @Column({ type: 'int', name: 'manager_level', nullable: true })
  managerLevel?: number | null;

  @Column({ type: 'int', default: 0 })
  gap: number;

  @BeforeInsert()
  assignCode(): void {
    if (!this.assessmentCode) {
      this.assessmentCode = generatePrefixedCode('SA');
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  computeGap(): void {
    const benchmark = this.managerLevel ?? this.selfLevel ?? 0;
    const expected = this.expectedLevel ?? 0;
    this.gap = expected - benchmark;
  }
}
