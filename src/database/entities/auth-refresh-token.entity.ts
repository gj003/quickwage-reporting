// src/database/entities/auth-refresh-token.entity.ts

import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('auth_refresh_token')
@Unique(['user_id'])
export class AuthRefreshTokenEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly auth_refresh_token_id: string;

  @Column({ type: 'uuid', name: 'company_id' })
  company_id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'varchar', length: 512, unique: true })
  refresh_token_code: string;

  @Column({ type: 'varchar', length: 255 })
  refresh_token_hash: string;

  @Column({ type: 'timestamp' })
  expires_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  revoked_at?: Date | null;

  @Column({ type: 'varchar', nullable: true })
  revoked_reason?: string | null;

  @Column({ type: 'varchar', nullable: true })
  ip_address?: string | null;

  @Column({ type: 'varchar', nullable: true })
  user_agent?: string | null;

  @BeforeInsert()
  assignRefreshTokenCode(): void {
    if (!this.refresh_token_code) {
      this.refresh_token_code = generatePrefixedCode('RFT');
    }
  }
}
