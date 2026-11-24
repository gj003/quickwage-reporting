import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { generatePrefixedCode } from 'src/common/utility';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { CompanyEntity } from './company.entity';
import { RecruitmentDuplicateDetectionFieldEntity } from './recruitment-duplicate-detection-field.entity';

@Index('uq_recruitment_duplicate_setting_company', ['company_id'], {
  unique: true,
  where: '"deleted_at" IS NULL',
})
@Entity({ name: 'recruitment_duplicate_settings' })
export class RecruitmentDuplicateSettingEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'recruitment_duplicate_setting_id' })
  recruitment_duplicate_setting_id: string;

  @Column({ name: 'auto_inc', type: 'int' })
  @Generated('increment')
  auto_inc: number;

  @Column({
    name: 'recruitment_duplicate_setting_code',
    type: 'varchar',
    length: 64,
    unique: true,
  })
  recruitment_duplicate_setting_code: string;

  @Column({ name: 'company_id', type: 'uuid' })
  company_id: string;

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @Column({ name: 'match_mode', type: 'varchar', length: 20, default: 'ALL' })
  match_mode: string;

  @Column({ name: 'auto_merge_enabled', type: 'boolean', default: false })
  auto_merge_enabled: boolean;

  @Column({
    name: 'merge_strategy',
    type: 'varchar',
    length: 40,
    nullable: true,
  })
  merge_strategy?: string | null;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  created_by?: string | null;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updated_by?: string | null;

  @OneToMany(
    () => RecruitmentDuplicateDetectionFieldEntity,
    (field) => field.setting,
  )
  fields: RecruitmentDuplicateDetectionFieldEntity[];

  @BeforeInsert()
  assignCode(): void {
    if (!this.recruitment_duplicate_setting_code)
      this.recruitment_duplicate_setting_code = generatePrefixedCode(
        'RECRUITMENT_DUPLICATE_SETTING',
      );
  }
}
