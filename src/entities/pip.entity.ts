// src/database/entities/pip.entity.ts

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
import { SharedEntity } from './shared.entity';
import { PipTemplateEntity } from './pip-template.entity';
import { PipObjectiveEntity } from './pip-objective.entity';
import { PipCheckinEntity } from './pip-checkin.entity';
import { PipRiskSignalEntity } from './pip-risk-signal.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('pips')
@Index('idx_pips_company_status', ['companyId', 'status'])
@Index('idx_pips_company_priority', ['companyId', 'priority'])
@Index('idx_pips_department', ['departmentId'])
export class PipEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'pip_id' })
  pipId: string;

  @Column({ type: 'varchar', length: 30, name: 'pip_code', unique: true })
  pipCode: string;

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  /** Why the PIP was raised, shown apart from the description. */
  @Column({ type: 'text', nullable: true })
  reason?: string | null;

  @Column({ type: 'varchar', length: 50, default: 'DRAFT' })
  status: string;

  @Column({ type: 'varchar', length: 50, default: 'MEDIUM' })
  priority: string;

  @Column({ type: 'uuid', name: 'department_id', nullable: true })
  departmentId?: string | null;

  @Column({ type: 'uuid', name: 'assignee_employee_id' })
  assigneeEmployeeId: string;

  @Column({ type: 'uuid', name: 'manager_employee_id' })
  managerEmployeeId: string;

  @Column({ type: 'varchar', length: 50, default: 'PUBLIC' })
  confidentiality: string;

  @Column({ type: 'date', name: 'start_date', nullable: true })
  startDate?: string | null;

  @Column({ type: 'date', name: 'end_date', nullable: true })
  endDate?: string | null;

  @Column({ type: 'int', name: 'estimated_hours', nullable: true })
  estimatedHours?: number | null;

  @Column({
    type: 'boolean',
    name: 'acknowledgment_required',
    default: false,
  })
  acknowledgmentRequired: boolean;

  @Column({
    type: 'numeric',
    precision: 5,
    scale: 2,
    name: 'current_progress_pct',
    nullable: true,
  })
  currentProgressPct?: number | null;

  @Column({
    type: 'numeric',
    precision: 5,
    scale: 2,
    name: 'smart_score_pct',
    nullable: true,
  })
  smartScorePct?: number | null;

  @Column({ type: 'uuid', name: 'template_ref_id', nullable: true })
  templateRefId?: string | null;

  /** The review cycle whose rating prompted this PIP, when one did. */
  @Column({ type: 'uuid', name: 'source_cycle_id', nullable: true })
  sourceCycleId?: string | null;

  /** The released rating that prompted this PIP, when one did. */
  @Column({ type: 'uuid', name: 'source_final_rating_id', nullable: true })
  sourceFinalRatingId?: string | null;

  @Column({ type: 'uuid', name: 'created_by' })
  createdBy: string;

  @Column({ type: 'uuid', name: 'updated_by' })
  updatedBy: string;

  @Column({ type: 'timestamptz', name: 'acknowledged_at', nullable: true })
  acknowledgedAt?: Date | null;

  @Column({ type: 'timestamptz', name: 'activated_at', nullable: true })
  activatedAt?: Date | null;

  @Column({ type: 'timestamptz', name: 'completed_at', nullable: true })
  completedAt?: Date | null;

  @ManyToOne(() => PipTemplateEntity, (template) => template.pips, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'template_ref_id' })
  template?: PipTemplateEntity | null;

  @OneToMany(() => PipObjectiveEntity, (objective) => objective.pip)
  objectives?: PipObjectiveEntity[];

  @OneToMany(() => PipCheckinEntity, (checkin) => checkin.pip)
  checkins?: PipCheckinEntity[];

  @OneToMany(() => PipRiskSignalEntity, (signal) => signal.pip)
  riskSignals?: PipRiskSignalEntity[];

  @BeforeInsert()
  assignPipCode(): void {
    if (!this.pipCode) {
      this.pipCode = generatePrefixedCode('PIP');
    }
  }
}
