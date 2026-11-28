import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';
import { ProbationDurationUnit } from 'src/common/enum';

@Entity('notice_period_policy')
export class NoticePeriodPolicyEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  notice_period_policy_id: string;

  @Column({ type: 'varchar', length: 255 })
  notice_period_title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int' })
  duration: number;

  @Column({ type: 'varchar', length: 20, default: ProbationDurationUnit.DAYS })
  duration_unit: ProbationDurationUnit;

  @Column({ type: 'uuid' })
  company_id: string;

  @ManyToOne(() => CompanyEntity, (company) => company.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;
}
