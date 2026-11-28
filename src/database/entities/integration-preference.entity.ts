import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';

export type DuplicateDetectionMode = 'OFF' | 'CAMPAIGN' | 'ORGANIZATION';

@Entity({ name: 'integration_preferences' })
@Unique(['orgId'])
export class IntegrationPreferenceEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('increment', { name: 'integration_preference_id' })
  integrationPreferenceId: number;

  @Column({ name: 'org_id', type: 'varchar', length: 64 })
  orgId: string;

  @Column({ name: 'auto_qualify', type: 'boolean', default: false })
  autoQualify: boolean;

  @Column({ name: 'smart_messaging', type: 'boolean', default: true })
  smartMessaging: boolean;

  @Column({
    name: 'duplicate_detection',
    type: 'varchar',
    length: 32,
    default: 'CAMPAIGN',
  })
  duplicateDetection: DuplicateDetectionMode;

  @Column({ name: 'message_templates_json', type: 'jsonb', nullable: true })
  messageTemplatesJson: Record<string, string> | null;
}
