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
import { UserEntity } from './user.entity';

@Entity({ name: 'preboarding_offer_activities' })
@Index('idx_preboarding_offer_activities_tenant', [
  'company_id',
  'preboarding_id',
])
export class PreboardingOfferActivityEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'preboarding_offer_activity_id' })
  preboarding_offer_activity_id: string;
  @Column({ type: 'varchar', length: 64, unique: true })
  preboarding_offer_activity_code: string;
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

  @Column({ type: 'uuid', nullable: true }) actor_id: string | null;
  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'actor_id', referencedColumnName: 'user_id' })
  actor: UserEntity;
  @Column({ type: 'varchar', length: 100 }) action: string;
  @Column({ type: 'text', nullable: true }) comment: string | null;

  @BeforeInsert() assignCode(): void {
    if (!this.preboarding_offer_activity_code)
      this.preboarding_offer_activity_code = generatePrefixedCode(
        'PREBOARDING_OFFER_ACTIVITY',
        12,
      );
  }
}
