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
import { UserEntity } from './user.entity';
import { SocialWallPostEntity } from './social-wall-post.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('social_wall_interactions')
@Index('uq_wall_interaction_actor', ['company_id', 'post_id', 'user_id'], {
  unique: true,
})
export class SocialWallInteractionEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid') interaction_id: string;
  @Column({ type: 'varchar', unique: true }) interaction_code: string;
  @Column({ type: 'uuid' }) company_id: string;
  @Column({ type: 'uuid' }) post_id: string;
  @Column({ type: 'uuid' }) user_id: string;
  @Column({ type: 'varchar', nullable: true }) reaction: string | null;
  @Column({ type: 'varchar', nullable: true }) option_id: string | null;
  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;
  @ManyToOne(() => SocialWallPostEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: SocialWallPostEntity;
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
  @BeforeInsert() assignCode() {
    if (!this.interaction_code)
      this.interaction_code = generatePrefixedCode('WINT', 10);
  }
}
