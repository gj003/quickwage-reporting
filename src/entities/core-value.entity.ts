import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'core_values' })
@Index('idx_core_value_company', ['companyId'])
export class CoreValueEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'core_value_id' })
  coreValueId: string;

  @Column({ type: 'varchar', name: 'core_value_code', unique: true })
  coreValueCode: string;

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string;

  @Column({ type: 'varchar', length: 120 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;

  @BeforeInsert()
  assignCoreValueCode(): void {
    if (!this.coreValueCode) {
      this.coreValueCode = generatePrefixedCode('CVAL');
    }
  }
}
