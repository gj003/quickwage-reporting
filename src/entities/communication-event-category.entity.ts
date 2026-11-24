import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('communication_event_categories')
export class CommunicationEventCategoryEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  communication_event_category_id: string;

  @Column({ type: 'varchar', unique: true })
  category_code: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'varchar', nullable: true })
  icon?: string | null;

  @Column({ type: 'int', default: 0 })
  sort_order: number;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'uuid', nullable: true })
  created_by?: string | null;

  @Column({ type: 'uuid', nullable: true })
  updated_by?: string | null;

  @BeforeInsert()
  assignCode() {
    if (!this.category_code)
      this.category_code = generatePrefixedCode('EVENT_CATEGORY');
  }
}
