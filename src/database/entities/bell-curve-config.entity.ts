import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'bell_curve_configs' })
@Index('idx_bell_curve_company', ['companyId'])
export class BellCurveConfigEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'bell_curve_config_id' })
  bellCurveConfigId: string;

  @Column({ type: 'varchar', name: 'config_code', unique: true })
  configCode: string;

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string;

  @Column({ type: 'varchar', length: 30, name: 'enforcement_level' })
  enforcementLevel: string;

  @Column({
    type: 'numeric',
    precision: 5,
    scale: 2,
    name: 'allowed_variance_pct',
  })
  allowedVariancePct: number;

  @Column({
    type: 'jsonb',
    name: 'distribution_targets',
    default: () => "'{}'",
  })
  distributionTargets: Record<string, number>;

  @BeforeInsert()
  assignCode(): void {
    if (!this.configCode) {
      this.configCode = generatePrefixedCode('BCC');
    }
  }
}
