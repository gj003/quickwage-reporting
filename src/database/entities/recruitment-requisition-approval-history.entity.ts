// src/database/entities/recruitment-requisition-approval-history.entity.ts

import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';
import { RecruitmentRequisitionEntity } from './recruitment-requisition.entity';
import { UserEntity } from './user.entity';
import { RequisitionApprovalAction } from 'src/common/enum';
import { generatePrefixedCode } from 'src/common/utility';

@Index('idx_recruitment_requisition_approval_history_requisition', [
  'recruitment_requisition_id',
  'created_at',
])
@Index('idx_recruitment_requisition_approval_history_company', ['company_id'])
@Entity({ name: 'recruitment_requisition_approval_history' })
export class RecruitmentRequisitionApprovalHistoryEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'recruitment_requisition_approval_history_id',
  })
  recruitment_requisition_approval_history_id: string;

  @Column({
    name: 'recruitment_requisition_approval_history_code',
    type: 'varchar',
    length: 32,
    unique: true,
  })
  recruitment_requisition_approval_history_code: string;

  @Column({ name: 'company_id', type: 'uuid' })
  company_id: string;

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @Column({ name: 'recruitment_requisition_id', type: 'uuid' })
  recruitment_requisition_id: string;

  @ManyToOne(
    () => RecruitmentRequisitionEntity,
    (requisition) => requisition.approval_history,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({
    name: 'recruitment_requisition_id',
    referencedColumnName: 'recruitment_requisition_id',
  })
  requisition: RecruitmentRequisitionEntity;

  // the configured approval level sequence this action relates to (null for
  // requisition-level events such as SUBMITTED / RESUBMITTED / CLONED / JOB_CREATED)
  @Column({ name: 'level_sequence', type: 'int', nullable: true })
  level_sequence?: number | null;

  @Column({ name: 'action', type: 'varchar', length: 20 })
  action: RequisitionApprovalAction;

  // null for system-driven events (e.g. LEVEL_SKIPPED because no approver was resolvable)
  @Column({ name: 'actor_id', type: 'uuid', nullable: true })
  actor_id?: string | null;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'actor_id', referencedColumnName: 'user_id' })
  actor?: UserEntity | null;

  @Column({ name: 'comments', type: 'text', nullable: true })
  comments?: string | null;

  @BeforeInsert()
  assignCode(): void {
    if (!this.recruitment_requisition_approval_history_code) {
      this.recruitment_requisition_approval_history_code =
        generatePrefixedCode('REQ_HIST');
    }
  }
}
