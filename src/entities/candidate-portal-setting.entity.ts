import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { generatePrefixedCode } from 'src/common/utility';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { CompanyEntity } from './company.entity';

export interface CandidatePortalTaskValue {
  candidate_portal_task_id: string;
  name: string;
  due_in_days: number;
  type: string;
}

@Entity({ name: 'candidate_portal_settings' })
@Index('uq_candidate_portal_settings_company', ['company_id'], { unique: true })
export class CandidatePortalSettingEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'candidate_portal_settings_id' })
  candidate_portal_settings_id: string;

  @Column({
    name: 'candidate_portal_settings_code',
    type: 'varchar',
    length: 64,
    unique: true,
  })
  candidate_portal_settings_code: string;

  @Column({ name: 'company_id', type: 'uuid' })
  company_id: string;

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @Column({ name: 'logo', type: 'varchar', length: 500, nullable: true })
  logo: string | null;

  @Column({ name: 'welcome_message', type: 'text', nullable: true })
  welcome_message: string | null;

  @Column({
    name: 'about_company_link',
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  about_company_link: string | null;

  @Column({
    name: 'candidate_tasks',
    type: 'jsonb',
    default: () => "'[]'::jsonb",
  })
  candidate_tasks: CandidatePortalTaskValue[];

  @Column({
    name: 'first_day_details',
    type: 'jsonb',
    default: () => "'{}'::jsonb",
  })
  first_day_details: Record<string, unknown>;

  @Column({ type: 'int', default: 7 }) credential_expiry_days: number;

  @BeforeInsert()
  assignCode(): void {
    if (!this.candidate_portal_settings_code)
      this.candidate_portal_settings_code = generatePrefixedCode(
        'CAND_PORTAL_SETTING',
      );
  }
}
