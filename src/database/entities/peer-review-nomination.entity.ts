// src/database/entities/peer-review-nomination.entity.ts

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
import { ReviewCycleEntity } from './review-cycle.entity';
import { UserEntity } from './user.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { PeerNominationSource, PeerNominationStatus } from 'src/common/enum';

/**
 * One peer put forward to review one employee in one cycle.
 *
 * Deliberately separate from `peer_reviews`: nominating and reviewing are two
 * state machines, and a nomination can be declined before any feedback exists.
 *
 * The table supports both conventions rather than forcing one — an employee
 * nominating their own reviewers lands as PENDING for a manager to approve,
 * while a manager or HR assigning directly lands as APPROVED. `source` records
 * which happened.
 */
@Entity('peer_review_nominations')
@Index('idx_peer_nominations_cycle_employee', ['cycleId', 'employeeUserId'])
@Index('idx_peer_nominations_peer', ['peerUserId', 'status'])
@Index(
  'idx_peer_nominations_unique',
  ['cycleId', 'employeeUserId', 'peerUserId'],
  { unique: true },
)
export class PeerReviewNominationEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'peer_review_nomination_id' })
  peerReviewNominationId: string;

  @Column({ type: 'varchar', length: 30, nullable: true, unique: true })
  code?: string | null;

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string;

  @Column({ type: 'uuid', name: 'cycle_id' })
  cycleId: string;

  /** The person being reviewed. */
  @Column({ type: 'uuid', name: 'employee_user_id' })
  employeeUserId: string;

  /** The person asked to give feedback. */
  @Column({ type: 'uuid', name: 'peer_user_id' })
  peerUserId: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: PeerNominationStatus.PENDING,
  })
  status: PeerNominationStatus;

  @Column({ type: 'varchar', length: 20 })
  source: PeerNominationSource;

  @Column({ type: 'uuid', name: 'nominated_by_user_id' })
  nominatedByUserId: string;

  @Column({ type: 'uuid', name: 'decided_by_user_id', nullable: true })
  decidedByUserId?: string | null;

  @Column({ type: 'timestamptz', name: 'decided_at', nullable: true })
  decidedAt?: Date | null;

  /** Why a nomination was turned down — shown back to whoever proposed it. */
  @Column({ type: 'text', name: 'decision_reason', nullable: true })
  decisionReason?: string | null;

  @ManyToOne(() => ReviewCycleEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cycle_id' })
  cycle?: ReviewCycleEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_user_id' })
  employee?: UserEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'peer_user_id' })
  peer?: UserEntity;

  @BeforeInsert()
  assignCode(): void {
    if (!this.code) {
      this.code = generatePrefixedCode('PRN');
    }
  }
}
