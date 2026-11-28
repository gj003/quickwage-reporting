import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { CustomFieldEntity } from './custom-field.entity';

@Entity({ name: 'custom_field_value' })
export class CustomFieldValueEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('increment', { name: 'custom_field_value_id' })
  customFieldValueId: number;

  @Column({ name: 'auto_inc', type: 'int' })
  @Generated('increment')
  autoInc: number;

  @Column({ name: 'value_code', type: 'varchar', length: 32, unique: true })
  valueCode: string;

  @Column({ name: 'field_id', type: 'int' })
  fieldId: number;

  @ManyToOne(() => CustomFieldEntity, (field) => field.values, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'field_id', referencedColumnName: 'customFieldId' })
  field: CustomFieldEntity;

  @Column({ name: 'entity_id', type: 'varchar', length: 120 })
  entityId: string;

  @Column({ name: 'value_json', type: 'text', nullable: true })
  valueJson?: string | null;

  @BeforeInsert()
  assignValueCode(): void {
    if (!this.valueCode) {
      this.valueCode = generatePrefixedCode('CUSTVAL');
    }
  }
}
