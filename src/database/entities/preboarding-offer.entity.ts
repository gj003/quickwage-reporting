import { BusinessUnitEntity } from './business-unit.entity';
import { DepartmentEntity } from './department.entity';
import { DesignationEntity } from './designation.entity';
import { HireCommTemplateEntity } from './hire-comm-template.entity';
import { LegalEntity } from './legal_entity.entity';
import { PayrollPayGroupEntity } from './payroll-pay-group.entity';
import { UserEntity } from './user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';
import { PreboardingEntity } from './preboarding.entity';
import { generatePrefixedCode } from 'src/common/utility';
import {
  OfferDetailsDTO,
  OfferDecisionDTO,
} from 'src/modules/recruitment-and-onboarding/preboarding/dto/preboarding-workflow.dto';

@Entity({ name: 'preboarding_offers' })
@Index('idx_preboarding_offers_tenant', ['company_id', 'preboarding_id'])
@Index('uq_preboarding_offer_active', ['company_id', 'preboarding_id'], {
  unique: true,
  where: 'deleted_at IS NULL',
})
export class PreboardingOfferEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'preboarding_offer_id' })
  preboarding_offer_id: string;
  @Column({ type: 'varchar', length: 64, unique: true })
  preboarding_offer_code: string;
  @Column({ type: 'uuid' }) company_id: string;
  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;
  @Column({ type: 'uuid' }) preboarding_id: string;
  @ManyToOne(() => PreboardingEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({
    name: 'preboarding_id',
    referencedColumnName: 'preboarding_id',
  })
  preboarding: PreboardingEntity;

  @Column({ type: 'varchar', default: 'DRAFT' }) status: string;
  @Column({ type: 'varchar', default: 'PENDING' }) approval_status: string;
  @Column({ type: 'varchar', default: 'NOT_REQUIRED' })
  signature_status: string;
  @Column({ type: 'jsonb', default: () => "'{}'::jsonb" })
  details: OfferDetailsDTO;
  @Column({ type: 'jsonb', default: () => "'[]'::jsonb" })
  approvals: OfferDecisionDTO[];
  @Column({ type: 'jsonb', default: () => "'[]'::jsonb" })
  signatures: OfferDecisionDTO[];
  @Column({ type: 'varchar', default: 'NOT_SENT' }) email_status: string;

  @Column({ type: 'uuid', nullable: true }) legal_entity_id: string | null;
  @ManyToOne(() => LegalEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({
    name: 'legal_entity_id',
    referencedColumnName: 'legal_entity_id',
  })
  legal_entity_id_relation: LegalEntity;
  @Column({ type: 'int', nullable: true }) designation_id: number | null;
  @ManyToOne(() => DesignationEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'designation_id', referencedColumnName: 'id' })
  designation_id_relation: DesignationEntity;
  @Column({ type: 'int', nullable: true }) business_unit_id: number | null;
  @ManyToOne(() => BusinessUnitEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'business_unit_id', referencedColumnName: 'id' })
  business_unit_id_relation: BusinessUnitEntity;
  @Column({ type: 'int', nullable: true }) department_id: number | null;
  @ManyToOne(() => DepartmentEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'department_id', referencedColumnName: 'id' })
  department_id_relation: DepartmentEntity;
  @Column({ type: 'uuid', nullable: true }) reporting_manager_id: string | null;
  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'reporting_manager_id', referencedColumnName: 'user_id' })
  reporting_manager_id_relation: UserEntity;
  @Column({ type: 'uuid', nullable: true }) contact_person_id: string | null;
  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'contact_person_id', referencedColumnName: 'user_id' })
  contact_person_id_relation: UserEntity;
  @Column({ type: 'uuid', nullable: true }) pay_group_id: string | null;
  @ManyToOne(() => PayrollPayGroupEntity, {
    nullable: true,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'pay_group_id',
    referencedColumnName: 'payroll_pay_group_id',
  })
  pay_group_id_relation: PayrollPayGroupEntity;
  @Column({ type: 'uuid', nullable: true }) template_id: string | null;
  @ManyToOne(() => HireCommTemplateEntity, {
    nullable: true,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'template_id',
    referencedColumnName: 'hireCommTemplateId',
  })
  template_id_relation: HireCommTemplateEntity;

  @BeforeInsert() assignCode(): void {
    if (!this.preboarding_offer_code)
      this.preboarding_offer_code = generatePrefixedCode('PREBOARDING_OFFER');
  }
}
