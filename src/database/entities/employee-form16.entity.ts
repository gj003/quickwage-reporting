import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';
import { LegalEntity } from './legal_entity.entity';
import { UserEntity } from './user.entity';
@Entity({ name: 'employee_form16' })
@Index('idx_employee_form16_company', ['company_id'])
@Index(
  'uq_employee_form16_active',
  ['company_id', 'employee_id', 'financial_year'],
  { unique: true, where: '"deleted_at" IS NULL' },
)
export class EmployeeForm16Entity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'employee_form16_id' })
  readonly employee_form16_id: string;
  @Column({ type: 'uuid' }) company_id: string;
  @Column({ type: 'uuid' }) employee_id: string;
  @Column({ type: 'uuid' }) legal_entity_id: string;
  @Column({ type: 'varchar', length: 20 }) financial_year: string;
  @Column({ type: 'varchar', length: 30, default: 'UPLOADED' })
  form_status: string;
  @Column({ type: 'varchar', length: 30, default: 'NOT_SENT' })
  email_status: string;
  @Column({ type: 'varchar', length: 30, default: 'NOT_RELEASED' })
  release_status: string;
  @Column({ type: 'varchar', length: 100 }) document_id: string;
  @Column({ type: 'varchar', length: 255 }) file_name: string;
  @Column({ type: 'text' }) storage_url: string;
  @Column({ type: 'integer' }) file_size: number;
  @Column({ type: 'varchar', length: 100 }) mime_type: string;
  @Column({ type: 'varchar', length: 100, nullable: true })
  part_a_document_id?: string | null;
  @Column({ type: 'varchar', length: 255, nullable: true })
  part_a_file_name?: string | null;
  @Column({ type: 'text', nullable: true }) part_a_storage_url?: string | null;
  @Column({ type: 'integer', nullable: true }) part_a_file_size?: number | null;
  @Column({ type: 'varchar', length: 100, nullable: true })
  part_a_mime_type?: string | null;
  @Column({ type: 'varchar', length: 100, nullable: true })
  part_b_document_id?: string | null;
  @Column({ type: 'varchar', length: 255, nullable: true })
  part_b_file_name?: string | null;
  @Column({ type: 'text', nullable: true }) part_b_storage_url?: string | null;
  @Column({ type: 'integer', nullable: true }) part_b_file_size?: number | null;
  @Column({ type: 'varchar', length: 100, nullable: true })
  part_b_mime_type?: string | null;
  @Column({ type: 'timestamptz', nullable: true })
  email_sent_at?: Date | null;
  @Column({ type: 'timestamptz', nullable: true })
  released_at?: Date | null;
  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) updated_by?: string | null;
  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id', referencedColumnName: 'user_id' })
  employee: UserEntity;
  @ManyToOne(() => LegalEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({
    name: 'legal_entity_id',
    referencedColumnName: 'legal_entity_id',
  })
  legal_entity: LegalEntity;
}
