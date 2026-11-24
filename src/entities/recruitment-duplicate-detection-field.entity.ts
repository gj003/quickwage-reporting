import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { RecruitmentDuplicateSettingEntity } from './recruitment-duplicate-setting.entity';

@Entity({ name: 'recruitment_duplicate_detection_fields' })
@Index(
  'uq_recruitment_duplicate_field_setting_name',
  ['recruitment_duplicate_setting_id', 'field_name'],
  { unique: true, where: '"deleted_at" IS NULL' },
)
export class RecruitmentDuplicateDetectionFieldEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', {
    name: 'recruitment_duplicate_detection_field_id',
  })
  recruitment_duplicate_detection_field_id: string;

  @Column({ name: 'company_id', type: 'uuid' })
  company_id: string;

  @Column({ name: 'recruitment_duplicate_setting_id', type: 'uuid' })
  recruitment_duplicate_setting_id: string;

  @ManyToOne(
    () => RecruitmentDuplicateSettingEntity,
    (setting) => setting.fields,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'recruitment_duplicate_setting_id' })
  setting: RecruitmentDuplicateSettingEntity;

  @Column({ name: 'field_name', type: 'varchar', length: 40 })
  field_name: string;

  @Column({ name: 'is_enabled', type: 'boolean', default: true })
  is_enabled: boolean;
}
