import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { RecruitmentRequisitionEntity } from './recruitment-requisition.entity';
import { UserEntity } from './user.entity';

@Entity('recruitment_requisition_backfill_rows')
@Index('idx_req_backfill_company_requisition', [
  'company_id',
  'recruitment_requisition_id',
])
export class RecruitmentRequisitionBackfillRowEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  recruitment_requisition_backfill_row_id: string;
  @Column({ type: 'uuid' }) company_id: string;
  @Column({ type: 'uuid' }) recruitment_requisition_id: string;
  @ManyToOne(
    () => RecruitmentRequisitionEntity,
    (requisition) => requisition.backfill_rows,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'recruitment_requisition_id' })
  requisition: RecruitmentRequisitionEntity;
  @Column({ type: 'uuid' }) employee_id: string;
  @ManyToOne(() => UserEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'employee_id', referencedColumnName: 'user_id' })
  employee: UserEntity;
  @Column({ type: 'varchar', length: 40 }) backfill_reason: string;
  @Column({ type: 'date' }) start_hire_date: string;
  @Column({ type: 'date' }) target_hire_date: string;
}
