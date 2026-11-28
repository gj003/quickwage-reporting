import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';
import { DepartmentEntity } from './department.entity';
import { BusinessUnitEntity } from './business-unit.entity';

@Entity('cost_centers')
export class CostCenterEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true })
  cost_center_code: string;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('text', { nullable: true })
  description?: string;

  // ✅ Replace old `business_unit` varchar with a relation
  @Column({ type: 'int', nullable: true })
  business_unit_id?: number;

  @ManyToOne(() => BusinessUnitEntity, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'business_unit_id' })
  businessUnit?: BusinessUnitEntity;

  @Column({
    type: 'boolean',
    default: true,
    comment: 'True => ACTIVE, False => INACTIVE',
  })
  status: boolean;

  @Column({ type: 'uuid' })
  company_id: string;

  // Relations
  @ManyToOne(() => CompanyEntity, (rel) => rel.costCenters, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @OneToMany(() => DepartmentEntity, (rel) => rel.costCenter)
  departments: DepartmentEntity[];
}
