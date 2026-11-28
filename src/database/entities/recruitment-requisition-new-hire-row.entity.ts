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

@Entity('recruitment_requisition_new_hire_rows')
@Index('idx_req_new_hire_company_requisition', [
  'company_id',
  'recruitment_requisition_id',
])
export class RecruitmentRequisitionNewHireRowEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  recruitment_requisition_new_hire_row_id: string;
  @Column({ type: 'uuid' }) company_id: string;
  @Column({ type: 'uuid' }) recruitment_requisition_id: string;
  @ManyToOne(
    () => RecruitmentRequisitionEntity,
    (requisition) => requisition.new_hire_rows,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'recruitment_requisition_id' })
  requisition: RecruitmentRequisitionEntity;
  @Column({ type: 'varchar', length: 200 }) location: string;
  @Column({ type: 'date' }) start_hire_date: string;
  @Column({ type: 'date' }) target_hire_date: string;
  @Column({ type: 'int' }) positions: number;
}
