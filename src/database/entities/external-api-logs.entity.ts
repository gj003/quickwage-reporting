import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity()
export class ExternalApiCallsLogs extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: true })
  requestId: string; // Request id to track consecutive api calls

  @Column('text', { nullable: true })
  serviceName: string; // Name of the 3rd party service being called

  @Column('text', { nullable: true })
  requestPayload: string; // Request payload sent to the API

  @Column('text', { nullable: true })
  responsePayload: string; // Response payload received from the API
}
