import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('legal_entity_change_log')
@Index('idx_legal_entity_change_org', ['organization_id'])
@Index('idx_legal_entity_change_entity', ['legal_entity_id'])
export class LegalEntityChangeLog extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly legal_entity_change_log_id: string;

  @Column({ type: 'varchar', length: 64 })
  organization_id: string;

  @Column({ type: 'varchar', length: 64 })
  legal_entity_id: string;

  @Column({ type: 'varchar', length: 120 })
  field_name: string;

  @Column({ type: 'text', nullable: true })
  old_value: string | null;

  @Column({ type: 'text', nullable: true })
  new_value: string | null;

  @Column({ type: 'varchar', length: 40 })
  change_type: string;

  @Column({ type: 'varchar', length: 64 })
  changed_by: string;

  @Column({ type: 'text', nullable: true })
  change_note: string | null;
}
