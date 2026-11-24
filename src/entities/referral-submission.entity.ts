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
import { ReferralProgramEntity } from './referral-program.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { UserEntity } from './user.entity';

@Index('idx_referral_submission_company_status', ['companyId', 'status'])
@Index('idx_referral_submission_program', ['programId'])
@Entity({ name: 'referral_submission' })
export class ReferralSubmissionEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'referral_submission_id' })
  referralSubmissionId: string;

  @Column({ name: 'auto_inc', type: 'int' })
  @Generated('increment')
  autoInc: number;

  @Column({
    name: 'submission_code',
    type: 'varchar',
    length: 32,
    unique: true,
  })
  submissionCode: string;

  @Column({ name: 'company_id', type: 'uuid' })
  companyId: string;

  @Column({ name: 'program_id', type: 'uuid' })
  programId: string;

  @ManyToOne(() => ReferralProgramEntity, (program) => program.submissions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'program_id',
    referencedColumnName: 'referralProgramId',
  })
  program: ReferralProgramEntity;

  @Column({ name: 'referrer_user_id', type: 'uuid' })
  referrerUserId: string;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'referrer_user_id', referencedColumnName: 'user_id' })
  referrer?: UserEntity | null;

  @Column({ name: 'candidate_id', type: 'int' })
  candidateId: number;

  @Column({ name: 'status', type: 'varchar', length: 32, default: 'submitted' })
  status: string;

  @Column({
    name: 'bonus_status',
    type: 'varchar',
    length: 32,
    default: 'pending',
  })
  bonusStatus: string;

  @Column({ name: 'timeline_json', type: 'text', nullable: true })
  timelineJson?: string | null;

  @BeforeInsert()
  assignSubmissionCode(): void {
    if (!this.submissionCode) {
      this.submissionCode = generatePrefixedCode('REFSUB');
    }
  }
}
