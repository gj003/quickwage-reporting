import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';

@Entity({ name: 'flow_templates' })
@Index('idx_flow_templates_org_name', ['orgId', 'name'], { unique: true })
export class FlowTemplateEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('increment', { name: 'flow_template_id' })
  flowTemplateId: number;

  @Column({ name: 'org_id', type: 'uuid', nullable: true })
  orgId?: string | null;

  @Column({ name: 'name', type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'department', type: 'varchar', length: 150, nullable: true })
  department?: string | null;

  @Column({ name: 'job_level', type: 'varchar', length: 150, nullable: true })
  jobLevel?: string | null;

  @Column({ name: 'stages_json', type: 'text' })
  stagesJson: string;

  @Column({ name: 'metrics_snapshot_json', type: 'text', nullable: true })
  metricsSnapshotJson?: string | null;
}
