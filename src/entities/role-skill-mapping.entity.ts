import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { DesignationEntity } from './designation.entity';
import { RoleEntity } from './roles.entity';
import { SkillEntity } from './skill.entity';

@Entity({ name: 'role_skill_mappings' })
@Index('idx_role_skill_role', ['roleId'])
@Index('idx_role_skill_skill', ['skillId'])
@Index('idx_role_skill_designation', ['designationId'])
export class RoleSkillMappingEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'role_skill_mapping_id' })
  roleSkillMappingId: string;

  @Column({ type: 'varchar', name: 'mapping_code', unique: true })
  mappingCode: string;

  @Column({ type: 'uuid', name: 'designation_id' })
  designationId: string;

  @ManyToOne(() => DesignationEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'designation_id' })
  designation: DesignationEntity;

  @Column({ type: 'uuid', name: 'role_id', nullable: true })
  roleId?: string | null;

  @ManyToOne(() => RoleEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'role_id' })
  role?: RoleEntity | null;

  @Column({ type: 'uuid', name: 'skill_id' })
  skillId: string;

  @ManyToOne(() => SkillEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'skill_id' })
  skill: SkillEntity;

  @Column({ type: 'varchar', length: 30, name: 'expected_level' })
  expectedLevel: string;

  @Column({ type: 'varchar', length: 30 })
  mandatory: string;

  @BeforeInsert()
  assignCode(): void {
    if (!this.mappingCode) {
      this.mappingCode = generatePrefixedCode('RSM');
    }
  }
}
