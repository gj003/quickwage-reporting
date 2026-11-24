import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'feedback_templates' })
@Index('idx_feedback_template_company', ['companyId'])
export class FeedbackTemplateEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'feedback_template_id' })
  feedbackTemplateId: string;

  @Column({
    type: 'varchar',
    name: 'template_code',
    unique: true,
  })
  templateCode: string;

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'jsonb', name: 'guided_questions', default: () => "'[]'" })
  guidedQuestions: string[];

  @Column({ type: 'boolean', name: 'is_default', default: false })
  isDefault: boolean;

  @Column({ type: 'varchar', length: 30 })
  category: string;

  @BeforeInsert()
  assignBadgeCode(): void {
    if (!this.templateCode) {
      this.templateCode = generatePrefixedCode('FBT');
    }
  }
}
