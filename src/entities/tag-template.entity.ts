import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { TagCategory } from './tag.entity';

@Index('idx_tag_template_category', ['category'])
@Entity({ name: 'tag_template' })
export class TagTemplateEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'tag_template_id' })
  tagTemplateId: string;

  @Column({ name: 'auto_inc', type: 'int' })
  @Generated('increment')
  autoInc: number;

  @Column({ name: 'template_code', type: 'varchar', length: 32, unique: true })
  templateCode: string;

  @Column({ name: 'name', type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'category', type: 'varchar', length: 32 })
  category: TagCategory;

  @Column({ name: 'tags_json', type: 'text' })
  tagsJson: string;

  @BeforeInsert()
  assignTemplateCode(): void {
    if (!this.templateCode) {
      this.templateCode = generatePrefixedCode('TAGTMP');
    }
  }
}
