import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { ReferralSubmissionEntity } from './referral-submission.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Index('idx_referral_program_company_active', ['companyId', 'isActive'])
@Entity({ name: 'referral_program' })
export class ReferralProgramEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'referral_program_id' })
  referralProgramId: string;

  @Column({ name: 'auto_inc', type: 'int' })
  @Generated('increment')
  autoInc: number;

  @Column({ name: 'program_code', type: 'varchar', length: 32, unique: true })
  programCode: string;

  @Column({ name: 'company_id', type: 'uuid' })
  companyId: string;

  @Column({ name: 'name', type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'rules_json', type: 'text' })
  rulesJson: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => ReferralSubmissionEntity, (submission) => submission.program)
  submissions: ReferralSubmissionEntity[];

  @BeforeInsert()
  assignProgramCode(): void {
    if (!this.programCode) {
      this.programCode = generatePrefixedCode('REFPRG');
    }
  }
}
