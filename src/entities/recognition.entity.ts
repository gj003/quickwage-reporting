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
import { RecognitionBadgeEntity } from './recognition-badge.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'recognition' })
@Index('idx_recognition_company_status', ['companyId', 'status'])
@Index('idx_recognition_company_receiver', ['companyId', 'receiverEmployeeId'])
export class RecognitionEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'recognition_id' })
  recognitionId: string;

  @Column({
    type: 'varchar',
    name: 'recognition_code',
    unique: true,
  })
  recognitionCode: string;

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string;

  @Column({ type: 'uuid', name: 'giver_employee_id' })
  giverEmployeeId: string;

  @Column({ type: 'uuid', name: 'receiver_employee_id' })
  receiverEmployeeId: string;

  @Column({ type: 'uuid', name: 'goals_id', nullable: true })
  goalId?: string | null;

  @Column({ type: 'uuid', name: 'badge_id', nullable: true })
  badgeId?: string | null;

  @ManyToOne(() => RecognitionBadgeEntity, { nullable: true })
  @JoinColumn({ name: 'badge_id' })
  badge?: RecognitionBadgeEntity | null;

  @Column({ type: 'text', nullable: true })
  message?: string | null;

  @Column({ type: 'varchar', length: 30, default: 'public' })
  visibility: string;

  @Column({ type: 'varchar', length: 30, default: 'published' })
  status: string;

  @BeforeInsert()
  assignBadgeCode(): void {
    if (!this.recognitionCode) {
      this.recognitionCode = generatePrefixedCode('RCGN');
    }
  }
}
