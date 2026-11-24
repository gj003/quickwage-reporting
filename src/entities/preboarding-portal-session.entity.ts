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

@Entity({ name: 'preboarding_portal_sessions' })
@Index('idx_preboarding_portal_sessions_tenant', [
  'company_id',
  'preboarding_id',
])
@Index(
  'uq_preboarding_portal_session_active',
  ['company_id', 'preboarding_id'],
  { unique: true, where: 'revoked = false AND deleted_at IS NULL' },
)
export class PreboardingPortalSessionEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'preboarding_portal_session_id' })
  preboarding_portal_session_id: string;
  @Column({ type: 'varchar', length: 64, unique: true })
  preboarding_portal_session_code: string;
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

  @Column({ type: 'timestamptz' }) expires_at: Date;
  @Column({ type: 'boolean', default: false }) revoked: boolean;

  @BeforeInsert() assignCode(): void {
    if (!this.preboarding_portal_session_code)
      this.preboarding_portal_session_code = generatePrefixedCode(
        'PREBOARDING_PORTAL_SESSION',
      );
  }
}
