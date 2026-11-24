import {
  Column,
  BeforeInsert,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';
import { CandidateEntity } from './candidate.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Index('idx_candidate_note_tenant', ['company_id', 'candidate_id'])
@Entity({ name: 'candidate_notes' })
export class CandidateNoteEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'candidate_note_id' })
  candidate_note_id: string;
  @Column({ type: 'varchar', length: 32, unique: true })
  candidate_note_code: string;
  @Column({ type: 'uuid' }) company_id: string;
  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;
  @Column({ type: 'uuid' }) candidate_id: string;
  @ManyToOne(() => CandidateEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id', referencedColumnName: 'candidate_id' })
  candidate: CandidateEntity;
  @Column({ type: 'uuid' }) author_id: string;
  @Column({ type: 'text' }) content: string;
  @Column({ type: 'varchar', length: 30, default: 'HIRING_TEAM' })
  visibility: string;
  @Column({ type: 'uuid', array: true, default: [] })
  mentioned_employee_ids: string[];
  @Column({ type: 'uuid', nullable: true }) interview_id?: string | null;
  @BeforeInsert() assignCode(): void {
    if (!this.candidate_note_code)
      this.candidate_note_code = generatePrefixedCode('CANDNOTE');
  }
}
