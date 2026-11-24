import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'ff_email_template' })
@Index('uq_ff_email_template_code', ['templateCode'], { unique: true })
export class FfEmailTemplateEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'ff_email_template_id' })
  ffEmailTemplateId: string;

  @Column({
    name: 'template_code',
    type: 'varchar',
    unique: true,
  })
  templateCode: string;

  @Column({ type: 'varchar', length: 255 })
  subject: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;

  @BeforeInsert()
  assignTemplateCode(): void {
    if (!this.templateCode) {
      this.templateCode = generatePrefixedCode('FFTPL');
    }
  }
}
