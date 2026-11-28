import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'performance_analysis' })
@Index('idx_performance_analysis_company', ['companyId'])
export class PerformanceAnalysisEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'performance_analysis_id' })
  performanceAnalysisId: string;

  @Column({ type: 'varchar', name: 'analysis_code', unique: true })
  analysisCode: string;

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string;

  @Column({ type: 'int', name: 'total_employees' })
  totalEmployees: number;

  @Column({ type: 'numeric', precision: 7, scale: 2, name: 'variance_score' })
  varianceScore: number;

  @Column({
    type: 'numeric',
    precision: 5,
    scale: 2,
    name: 'compliance_rate_pct',
  })
  complianceRatePct: number;

  @Column({ type: 'jsonb', name: 'department_variance', default: () => "'{}'" })
  departmentVariance: Record<string, number>;

  @Column({ type: 'jsonb', name: 'historical_trends', default: () => "'{}'" })
  historicalTrends: Record<string, number>;

  @BeforeInsert()
  assignCode(): void {
    if (!this.analysisCode) {
      this.analysisCode = generatePrefixedCode('PA');
    }
  }
}
