// src/database/entities/user.entity.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { CompanyEntity } from './company.entity';
import { UserInfoEntity } from './user_info.entity';
import { SessionEntity } from './session.entity';
import { RoleEntity } from './roles.entity';
import { UserRoleEntity } from './user-role.entity';
import { UserPayrollEntity } from './user-payroll.entity';
import { UserStatus, UserType } from 'src/common/enum';
import { SharedEntity } from './shared.entity';
import { OrganizationEmployeeGroup } from './organization-employee-group.entity';
import { JobDetailEntity } from './job-detail.entity';
import { UserOnboardingEntity } from './user-onboarding.entity';
import { UserFamilyEntity } from './user-family.entity';
import { AttendanceEntity } from './attendance.entity';
import { DesignationEntity } from './designation.entity';
import { AssetAssignmentEntity } from './asset-assignment.entity';
import { InterviewerAvailabilityEntity } from './interviewer-availability.entity';
import { EmployeeTravelRequestEntity } from './employee-travel-request.entity';
import { HRMS_AddressEntity } from './hrms-address.entity';
import { EmployeeLeaveBalanceEntity } from './employee-leave-balance.entity';
import { AssetRequestCommentEntity } from './asset-request-comment.entity';
import { EmployeeExitRequestEntity } from './employee-exit-request.entity';

@Entity('user')
export class UserEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly user_id: string;

  @Column({ nullable: true, type: 'varchar' })
  emp_id: string;

  @Column({ nullable: true, type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  phone: string;

  @Column({ nullable: true, type: 'varchar' })
  password: string;

  @Column({ type: 'int', default: 0 })
  passwordChangeCount: number;

  @Column({
    type: 'varchar',
    default: UserStatus.REGISTERED,
  })
  active_status: UserStatus;

  @Column({
    type: 'varchar',
    default: UserType.EMPLOYEE,
  })
  type: UserType;

  @Column({ type: 'bool', default: () => 'false' })
  is_phone_verified: boolean;

  @Column({ type: 'bool', default: () => 'false' })
  is_email_verified: boolean;

  @Column({ nullable: true, type: 'uuid' })
  company_id: string;

  @Column({ nullable: true, default: true, type: 'boolean' })
  isActive: boolean;

  @Column({ nullable: true, default: true, type: 'boolean' })
  allow_login: boolean;

  @Column({ type: 'boolean', default: false })
  hiring_free_user: boolean;

  // relations

  @OneToOne(() => UserInfoEntity, (rel) => rel.user, {
    cascade: true,
    nullable: true,
  })
  user_info: UserInfoEntity;

  @OneToOne(() => SessionEntity, (rel) => rel.user, {
    cascade: true,
    nullable: true,
  })
  session: SessionEntity;

  @OneToMany(() => HRMS_AddressEntity, (rel) => rel.user, {
    cascade: true,
    nullable: true,
  })
  addresses: HRMS_AddressEntity[];

  @ManyToOne(() => CompanyEntity, (rel) => rel.users, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @OneToMany(() => AttendanceEntity, (rel) => rel.user)
  attendance: AttendanceEntity[];

  @OneToOne(() => UserPayrollEntity, (rel) => rel.user)
  payroll: UserPayrollEntity;

  @OneToMany(() => UserRoleEntity, (userRole) => userRole.user, {
    cascade: true,
  })
  userRoles: UserRoleEntity[];

  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'user_id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: RoleEntity[];

  @ManyToMany(() => OrganizationEmployeeGroup, (rel) => rel.members)
  groups: OrganizationEmployeeGroup[];

  @OneToOne(() => JobDetailEntity, (rel) => rel.user, {
    cascade: true,
    nullable: true,
  })
  jobDetail: JobDetailEntity;

  @OneToOne(() => UserOnboardingEntity, (rel) => rel.user, {
    cascade: true,
    nullable: true,
  })
  onboarding: UserOnboardingEntity;

  @OneToMany(() => UserFamilyEntity, (rel) => rel.user)
  family_members: UserFamilyEntity[];

  @OneToMany(() => DesignationEntity, (rel) => rel.reportingUser)
  reportingDesignations: DesignationEntity[];

  @OneToMany(() => AssetAssignmentEntity, (rel) => rel.user)
  assetAssignments: AssetAssignmentEntity[];

  @OneToMany(
    () => InterviewerAvailabilityEntity,
    (availability) => availability.user,
  )
  interviewerAvailabilities: InterviewerAvailabilityEntity[];

  @OneToMany(() => EmployeeTravelRequestEntity, (travel) => travel.user)
  travel_bookings: EmployeeTravelRequestEntity[];

  @OneToMany(() => EmployeeLeaveBalanceEntity, (balance) => balance.user)
  leaveBalances: EmployeeLeaveBalanceEntity[];

  @OneToMany(
    () => AssetRequestCommentEntity,
    (assetRequestComment) => assetRequestComment.user,
  )
  assetRequestComments: AssetRequestCommentEntity[];

  @OneToMany(
    () => EmployeeExitRequestEntity,
    (employeeExitRequest) => employeeExitRequest.employee,
  )
  employeeExitRequests: EmployeeExitRequestEntity[];
}
