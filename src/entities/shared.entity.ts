// src/database/entities/shared.entity.ts
import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

export abstract class SharedEntity {
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  readonly created_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  readonly updated_at: Date;

  @Exclude() // 👈 this will remove deleted_at from JSON responses
  @DeleteDateColumn()
  readonly deleted_at: Date;

  toJSON() {
    const { deleted_at, ...rest } = this;
    return rest;
  }
}
