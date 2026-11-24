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
import { generatePrefixedCode } from 'src/common/utility';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { CompanyEntity } from './company.entity';
import { UserEntity } from './user.entity';

@Index('idx_candidate_tags_settings_company_id', ['company_id'])
@Index(
  'uq_candidate_tags_settings_company_name',
  ['company_id', 'normalized_name'],
  { unique: true, where: '"deleted_at" IS NULL' },
)
@Entity({ name: 'candidate_tags_settings' })
export class CandidateTagSettingEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'candidate_tag_id' })
  candidate_tag_id: string;

  @Column({ name: 'auto_inc', type: 'int' })
  @Generated('increment')
  auto_inc: number;

  @Column({
    name: 'candidate_tag_code',
    type: 'varchar',
    length: 64,
    unique: true,
  })
  candidate_tag_code: string;

  @Column({ name: 'company_id', type: 'uuid' })
  company_id: string;

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @Column({ name: 'name', type: 'varchar', length: 120 })
  name: string;

  @Column({ name: 'normalized_name', type: 'varchar', length: 120 })
  normalized_name: string;

  @Column({ name: 'description', type: 'varchar', length: 500, nullable: true })
  description?: string | null;

  @Column({
    name: 'display_color',
    type: 'varchar',
    length: 32,
    nullable: true,
  })
  display_color?: string | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  is_active: boolean;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  created_by?: string | null;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'created_by', referencedColumnName: 'user_id' })
  creator?: UserEntity | null;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updated_by?: string | null;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'updated_by', referencedColumnName: 'user_id' })
  updater?: UserEntity | null;

  @BeforeInsert()
  assignCode(): void {
    if (!this.candidate_tag_code)
      this.candidate_tag_code = generatePrefixedCode('CANDIDATE_TAG');
  }
}
