import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { CustomFieldValueEntity } from './custom-field-value.entity';

export type CustomFieldEntityType =
  'candidate' | 'job' | 'interview' | 'requisition' | 'pool';

export type CustomFieldDataType =
  'text' | 'number' | 'date' | 'select' | 'multi_select' | 'boolean' | 'json';

@Entity({ name: 'custom_field' })
export class CustomFieldEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('increment', { name: 'custom_field_id' })
  customFieldId: number;

  @Column({ name: 'auto_inc', type: 'int' })
  @Generated('increment')
  autoInc: number;

  @Column({ name: 'field_code', type: 'varchar', length: 32, unique: true })
  fieldCode: string;

  @Column({ name: 'entity', type: 'varchar', length: 32 })
  entity: CustomFieldEntityType;

  @Column({ name: 'name', type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'data_type', type: 'varchar', length: 32 })
  dataType: CustomFieldDataType;

  @Column({ name: 'config_json', type: 'text', nullable: true })
  configJson?: string | null;

  @Column({ name: 'is_required', type: 'boolean', default: () => 'false' })
  isRequired: boolean;

  @Column({ name: 'is_active', type: 'boolean', default: () => 'true' })
  isActive: boolean;

  @OneToMany(() => CustomFieldValueEntity, (value) => value.field)
  values: CustomFieldValueEntity[];

  @BeforeInsert()
  assignFieldCode(): void {
    if (!this.fieldCode) {
      this.fieldCode = generatePrefixedCode('CUSTF');
    }
  }
}
