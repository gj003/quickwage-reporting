// src/database/entities/company.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CompanyStatus, OrganizationIndustryType } from 'src/common/enum';
import { SharedEntity } from './shared.entity';
import { UserEntity } from './user.entity';
import { DepartmentEntity } from './department.entity';
import { DesignationEntity } from './designation.entity';
import { OrganizationEmployeeGroup } from './organization-employee-group.entity';
import { CostCenterEntity } from './cost-center.entity';
import { BusinessUnitEntity } from './business-unit.entity';
import { PayGradeEntity } from './paygrade.entity';
import { CareerBandEntity } from './career-band.entity';
import { AssetEntity } from './asset.entity';
import { CompanyLeaveTypeEntity } from './company-leave-type.entity';
import { EmployeeBulkImportEntity } from './employee-bulk-imports.entity';
import { HRMS_AddressEntity } from './hrms-address.entity';
import { CompanyHolidayEntity } from './company-holiday.entity';
import { HolidayCalendarEntity } from './holiday-calendar.entity';
import { ExpenseCategoryEntity } from './expense-category.entity';
import { CompanyLeavePlanEntity } from './company-leave-plans.entity';

@Entity('companies')
export class CompanyEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  readonly id: string;

  @Column('varchar', { nullable: true })
  domain: string;

  @Column('varchar', { nullable: true })
  company_name: string;

  @Column('varchar', { length: 50, nullable: false, unique: true })
  company_code: string;

  @Column('varchar', { nullable: true })
  industry_type: OrganizationIndustryType;

  @Column({
    type: 'varchar',
    default: CompanyStatus.REGISTERED,
  })
  status: CompanyStatus;

  @Column('varchar', { nullable: true })
  gst_number: string;

  @Column('varchar', { nullable: true })
  cin: string;

  @Column('varchar', { nullable: true })
  pan: string;

  @Column('varchar', { nullable: true })
  tan: string;

  @Column('varchar', { nullable: true })
  msme_registration_number: string;

  @Column({ type: 'json', nullable: true })
  metadata: Record<string, any>;

  @Column('varchar', { nullable: true })
  phone: string;

  @Column('varchar', { nullable: true })
  email: string;

  @Column('varchar', { nullable: true })
  address: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  logo: string;

  @Column({
    type: 'int',
    nullable: true,
    default: 50,
  })
  withdraw_percentage: number;

  // relations
  @OneToMany(() => UserEntity, (rel) => rel.company)
  users: UserEntity[];

  @OneToMany(() => DepartmentEntity, (rel) => rel.company)
  departments: DepartmentEntity[];

  @OneToMany(() => DesignationEntity, (rel) => rel.company)
  designations: DesignationEntity[];

  @OneToMany(() => HRMS_AddressEntity, (rel) => rel.company, {
    cascade: true,
  })
  addresses: HRMS_AddressEntity[];

  @OneToMany(() => OrganizationEmployeeGroup, (rel) => rel.company, {
    cascade: true,
  })
  employeeGroups: OrganizationEmployeeGroup[];

  @OneToMany(() => CostCenterEntity, (rel) => rel.company, {
    cascade: true,
  })
  costCenters: CostCenterEntity[];

  @OneToMany(() => BusinessUnitEntity, (rel) => rel.company, {
    cascade: true,
  })
  businessUnits: BusinessUnitEntity[];

  @OneToMany(() => PayGradeEntity, (rel) => rel.company, {
    cascade: true,
  })
  paygrades: PayGradeEntity[];

  @OneToMany(() => CareerBandEntity, (rel) => rel.company, {
    cascade: true,
  })
  careerBands: CareerBandEntity[];

  @OneToMany(() => AssetEntity, (rel) => rel.company, { cascade: true })
  assets: AssetEntity[];

  @OneToMany(() => ExpenseCategoryEntity, (rel) => rel.company, {
    cascade: true,
  })
  expenseCategories: ExpenseCategoryEntity[];

  @OneToMany(() => CompanyLeaveTypeEntity, (rel) => rel.company, {
    cascade: true,
  })
  leaveTypes: CompanyLeaveTypeEntity[];

  @OneToMany(() => EmployeeBulkImportEntity, (rel) => rel.company, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  bulkimports: EmployeeBulkImportEntity;

  @OneToMany(() => CompanyHolidayEntity, (rel) => rel.company, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  holidays: CompanyHolidayEntity[];

  @OneToMany(() => HolidayCalendarEntity, (rel) => rel.company)
  holiday_calendars: HolidayCalendarEntity[];

  @OneToMany(() => CompanyLeavePlanEntity, (leavePlan) => leavePlan.company)
  leavePlans: CompanyLeavePlanEntity[];
}
