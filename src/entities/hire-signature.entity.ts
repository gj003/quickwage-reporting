import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { CompanyEntity } from './company.entity';
import { UserEntity } from './user.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'hire_signatures' })
@Index('idx_hire_signatures_company_deleted', ['companyId', 'deleted_at'])
@Index('idx_hire_signatures_company_source', ['companyId', 'sourceType'])
export class HireSignatureEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'signature_id' })
  signatureId: string;

  @Column({ name: 'auto_inc', type: 'int' })
  @Generated('increment')
  autoInc: number;

  @Column({ name: 'signature_code', type: 'varchar', length: 40, unique: true })
  signatureCode: string;

  @Column({ name: 'company_id', type: 'uuid' })
  companyId: string;

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @Column({ name: 'name', type: 'varchar', length: 120 })
  name: string;

  @Column({ name: 'source_type', type: 'varchar', length: 16 })
  sourceType: string;

  @Column({ name: 'drawn_data', type: 'text', nullable: true })
  drawnData?: string | null;

  @Column({ name: 'storage_key', type: 'varchar', length: 500, nullable: true })
  storageKey?: string | null;

  @Column({
    name: 'preview_url',
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  previewUrl?: string | null;

  @Column({ name: 'created_by', type: 'uuid' })
  createdBy: string;

  @ManyToOne(() => UserEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'created_by', referencedColumnName: 'user_id' })
  creator: UserEntity;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy?: string | null;

  @BeforeInsert()
  assignCode(): void {
    if (!this.signatureCode) this.signatureCode = generatePrefixedCode('SIGN');
  }
}
