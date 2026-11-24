// src/database/entities/career-band.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';
import { PayGradeEntity } from './paygrade.entity';

@Entity('career_bands')
export class CareerBandEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 150, nullable: false })
  band_name: string;

  @Column('varchar', { length: 50, unique: true })
  band_code: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid', nullable: true })
  pay_grade_id?: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  // Relations
  @ManyToOne(() => CompanyEntity, (rel) => rel.careerBands, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @ManyToOne(() => PayGradeEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'pay_grade_id' })
  payGrade?: PayGradeEntity;
}
