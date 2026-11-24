import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { HiringFlowEntity } from './hiring-flow.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { InterviewEntity } from './interview.entity';
import { CompanyEntity } from './company.entity';

@Entity({ name: 'hiring_flow_stages' })
@Index('idx_hiring_stages_company_deleted', ['companyId', 'deleted_at'])
@Index('idx_hiring_stages_flow_order_deleted', [
  'flowId',
  'orderIndex',
  'deleted_at',
])
@Index('idx_hiring_stages_parent_order_deleted', [
  'parentStageId',
  'displayOrder',
  'deleted_at',
])
@Index('uq_hiring_stages_company_code', ['companyId', 'stageCode'], {
  unique: true,
})
export class HiringStageEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'hiring_stage_id' })
  hiringStageId: string;

  @Column({ name: 'stage_code', type: 'varchar', length: 32, unique: true })
  stageCode: string;

  @Column({ name: 'flow_id', type: 'uuid' })
  flowId: string;

  @Column({ name: 'company_id', type: 'uuid', nullable: true })
  companyId: string | null;

  @ManyToOne(() => CompanyEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @ManyToOne(() => HiringFlowEntity, (flow) => flow.stages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'flow_id', referencedColumnName: 'hiringFlowId' })
  flow: HiringFlowEntity;

  @Column({ name: 'parent_stage_id', type: 'uuid', nullable: true })
  parentStageId?: string | null;

  @ManyToOne(() => HiringStageEntity, (stage) => stage.childStages, {
    nullable: true,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'parent_stage_id',
    referencedColumnName: 'hiringStageId',
  })
  parentStage?: HiringStageEntity | null;

  @OneToMany(() => HiringStageEntity, (stage) => stage.parentStage)
  childStages: HiringStageEntity[];

  @Column({ name: 'stage_key', type: 'varchar', length: 50, nullable: true })
  stageKey?: string | null;

  @Column({ name: 'stage_type', type: 'varchar', length: 20, default: 'CHILD' })
  stageType: string;

  @Column({ name: 'is_system_stage', type: 'boolean', default: false })
  isSystemStage: boolean;

  @Column({ name: 'is_fixed', type: 'boolean', default: false })
  isFixed: boolean;

  @Column({ name: 'display_order', type: 'int', default: 0 })
  displayOrder: number;

  @Column({ name: 'parent_display_order', type: 'int', nullable: true })
  parentDisplayOrder?: number | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy?: string | null;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy?: string | null;

  @Column({ name: 'order_index', type: 'int' })
  orderIndex: number;

  @Column({ name: 'type', type: 'varchar', length: 50 })
  type: string;

  @Column({ name: 'name', type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'owners_json', type: 'text', nullable: true })
  ownersJson?: string | null;

  @Column({ name: 'mode', type: 'varchar', length: 20, default: 'manual' })
  mode: string;

  @Column({ name: 'duration_days', type: 'int', default: 0 })
  durationDays: number;

  @Column({ name: 'settings_json', type: 'text', nullable: true })
  settingsJson?: string | null;

  @OneToMany(() => InterviewEntity, (interview) => interview.stage)
  interviews: InterviewEntity[];

  @BeforeInsert()
  assignCode(): void {
    if (!this.stageCode) this.stageCode = generatePrefixedCode('HIRING_STAGE');
  }
}
