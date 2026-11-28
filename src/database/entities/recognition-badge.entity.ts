import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'recognition_badges' })
@Index('idx_recognition_badge_company', ['companyId'])
export class RecognitionBadgeEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'recognition_badge_id' })
  recognitionBadgeId: string;

  @Column({ type: 'varchar', name: 'badge_code', unique: true, length: 30 })
  badgeCode: string;

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string;

  @Column({ type: 'varchar', length: 120 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'varchar', length: 50 })
  category: string;

  @Column({ type: 'int', default: 0 })
  points: number;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;

  @BeforeInsert()
  assignBadgeCode(): void {
    if (!this.badgeCode) {
      this.badgeCode = generatePrefixedCode('BGE');
    }
  }
}
