import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'employee_identity_document' })
export class EmployeeIdentityDocumentEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'employee_identity_document_id' })
  employee_identity_document_id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'varchar', length: 50 })
  photo_id_type: string;

  @Column({ type: 'text', nullable: true })
  front_s3_url?: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  front_document_id?: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  front_file_name?: string | null;

  @Column({ type: 'text', nullable: true })
  back_s3_url?: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  back_document_id?: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  back_file_name?: string | null;

  @Column({ type: 'varchar', length: 200, nullable: true })
  name_on_card?: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  id_number?: string | null;

  @Column({ type: 'date', nullable: true })
  dob?: string | null;

  @Column({ type: 'varchar', length: 200, nullable: true })
  parent_spouse_name?: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  enrollment_number?: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nationality?: string | null;

  @Column({ type: 'date', nullable: true })
  date_of_issue?: string | null;

  @Column({ type: 'date', nullable: true })
  date_of_expiry?: string | null;

  @Column({ type: 'varchar', length: 20, default: 'active' })
  status: string;

  @Column({ type: 'varchar', length: 40, default: 'none' })
  verification_status: string;

  @Column({ type: 'uuid', nullable: true })
  verification_reference?: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  verification_requested_at?: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  verification_completed_at?: Date | null;

  @Column({ type: 'text', nullable: true })
  verification_failure_reason?: string | null;

  @Column({ type: 'uuid', nullable: true })
  created_by?: string | null;

  @Column({ type: 'uuid', nullable: true })
  updated_by?: string | null;

  @ManyToOne(() => UserEntity, (rel) => rel.user_id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => CompanyEntity, (rel) => rel.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;
}
