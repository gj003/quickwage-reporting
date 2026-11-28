import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';

@Entity({ name: 'helpdesk_ticket_followers' })
@Index('idx_helpdesk_ticket_followers_ticket', ['helpdeskTicketId'])
@Index('idx_helpdesk_ticket_followers_employee', ['employeeId'])
export class HelpdeskTicketFollowerEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'helpdesk_ticket_follower_id' })
  helpdeskTicketFollowerId: string;

  @Column({ type: 'uuid', name: 'helpdesk_ticket_id' })
  helpdeskTicketId: string;

  @Column({ type: 'uuid', name: 'employee_id' })
  employeeId: string;
}
