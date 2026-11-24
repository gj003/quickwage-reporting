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
import { UserEntity } from './user.entity';
import { PayrollRunEntity } from './payroll-run.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { SettlementSnapshotDTO } from 'src/modules/ff-settlement/dto/settlement-review.dto';
@Entity('ff_settlement_review')
@Index('idx_ff_review_company', ['company_id'])
@Index('uq_ff_review_code', ['company_id', 'code'], { unique: true })
export class FfSettlementReviewEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid') ff_settlement_review_id: string;
  @Column({ type: 'uuid' }) company_id: string;
  @Column({ type: 'uuid' }) employee_id: string;
  @Column({ type: 'uuid' }) reviewer_id: string;
  @Column({ type: 'uuid' }) source_payroll_run_id: string;
  @Column({ type: 'varchar', length: 80 }) code: string;
  @Column({ type: 'date' }) last_working_day: string;
  @Column({ type: 'varchar', length: 30, default: 'DRAFT' }) status: string;
  @Column({ type: 'int', default: 1 }) version: number;
  @Column({ type: 'jsonb' }) snapshot: SettlementSnapshotDTO;
  @Column({ type: 'uuid' }) created_by: string;
  @Column({ type: 'uuid', nullable: true }) finalized_by: string | null;
  @ManyToOne(() => CompanyEntity)
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'employee_id', referencedColumnName: 'user_id' })
  employee: UserEntity;
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'reviewer_id', referencedColumnName: 'user_id' })
  reviewer: UserEntity;
  @ManyToOne(() => PayrollRunEntity)
  @JoinColumn({ name: 'source_payroll_run_id' })
  sourceRun: PayrollRunEntity;
  @BeforeInsert() assignCode() {
    if (!this.code) this.code = generatePrefixedCode('FNF');
  }
}
