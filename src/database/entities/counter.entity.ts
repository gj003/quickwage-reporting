// src/database/entities/counter.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('counters')
@Unique(['name'])
export class CounterEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  counters_id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'int', default: 0 })
  seq: number;
}
