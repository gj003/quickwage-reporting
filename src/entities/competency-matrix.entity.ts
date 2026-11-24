import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'competency_matrix' })
@Index('idx_competency_role_skill', ['roleId', 'skillId'])
export class CompetencyMatrixEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'competency_matrix_id' })
  competencyMatrixId: string;

  @Column({ type: 'varchar', name: 'matrix_code', unique: true })
  matrixCode: string;

  @Column({ type: 'uuid', name: 'role_id' })
  roleId: string;

  @Column({ type: 'uuid', name: 'skill_id' })
  skillId: string;

  @Column({ type: 'int', name: 'expected_level' })
  expectedLevel: number;

  @Column({ type: 'int', name: 'current_level', default: 0 })
  currentLevel: number;

  @BeforeInsert()
  assignCode(): void {
    if (!this.matrixCode) {
      this.matrixCode = generatePrefixedCode('CM');
    }
  }
}
