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
import { generatePrefixedCode } from 'src/common/utility';
import { CandidateTagEntity } from './candidate-tag.entity';

export type TagCategory =
  'skill' | 'behavioral' | 'cultural' | 'experience' | 'performance';

@Index('idx_tag_org_category', ['orgId', 'category'])
@Entity({ name: 'tag' })
export class TagEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'tag_id' })
  tagId: string;

  @Column({ name: 'auto_inc', type: 'int' })
  @Generated('increment')
  autoInc: number;

  @Column({ name: 'tag_code', type: 'varchar', length: 32, unique: true })
  tagCode: string;

  @Column({ name: 'org_id', type: 'uuid' })
  orgId: string;

  @Column({ name: 'category', type: 'varchar', length: 32 })
  category: TagCategory;

  @Column({ name: 'name', type: 'varchar', length: 200 })
  name: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  description?: string | null;

  @Column({
    name: 'ai_confidence',
    type: 'numeric',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  aiConfidence?: number | null;

  @Column({ name: 'usage_count', type: 'int', default: () => '0' })
  usageCount: number;

  @OneToMany(() => CandidateTagEntity, (candidateTag) => candidateTag.tag)
  candidateTags: CandidateTagEntity[];

  @BeforeInsert()
  assignTagCode(): void {
    if (!this.tagCode) {
      this.tagCode = generatePrefixedCode('TAG');
    }
  }
}
