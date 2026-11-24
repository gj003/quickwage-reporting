import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'one_on_one_meetings' })
@Index('idx_o3_company_status', ['companyId', 'status'])
@Index('idx_o3_company_employee', ['companyId', 'employeeId'])
export class OneOnOneMeetingEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'one_on_one_id' })
  oneOnOneId: string;

  @Column({
    type: 'varchar',
    name: 'o3_code',
    unique: true,
  })
  o3Code: string;

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string;

  @Column({ type: 'uuid', name: 'employee_id' })
  employeeId: string;

  @Column({ type: 'uuid', name: 'manager_id' })
  managerId: string;

  @Column({ type: 'timestamptz', name: 'scheduled_at' })
  scheduledAt: Date;

  @Column({ type: 'int', name: 'duration_minutes', default: 30 })
  durationMinutes: number;

  @Column({ type: 'varchar', length: 30, default: 'weekly' })
  frequency: string;

  @Column({ type: 'varchar', length: 30, default: 'scheduled' })
  status: string;

  @Column({ type: 'jsonb', name: 'agenda_tags', default: () => "'[]'" })
  agendaTags: string[];

  /** Manager-only. Never exposed to the employee side of the feature. */
  @Column({ type: 'text', name: 'private_notes', nullable: true })
  privateNotes?: string | null;

  /** Visible to both participants — the shared record of the conversation. */
  @Column({ type: 'text', name: 'shared_notes', nullable: true })
  sharedNotes?: string | null;

  /** Shared by every occurrence generated from one recurring schedule. */
  @Column({ type: 'uuid', name: 'series_id', nullable: true })
  seriesId?: string | null;

  /** Set on every occurrence in a series; the horizon the series runs to. */
  @Column({ type: 'date', name: 'recurrence_until', nullable: true })
  recurrenceUntil?: string | null;

  /**
   * Set when this meeting is the closure conversation for a review cycle —
   * the talk about the released rating that closes the cycle for the
   * employee. Completing the meeting is what closes it.
   */
  @Column({ type: 'uuid', name: 'review_cycle_id', nullable: true })
  reviewCycleId?: string | null;

  /** The released rating the closure conversation discusses. */
  @Column({ type: 'uuid', name: 'final_rating_id', nullable: true })
  finalRatingId?: string | null;

  /** When the meeting was actually closed out, as opposed to when it was due. */
  @Column({ type: 'timestamptz', name: 'completed_at', nullable: true })
  completedAt?: Date | null;

  /** Guards the reminder sweep against sending twice. */
  @Column({ type: 'timestamptz', name: 'reminder_sent_at', nullable: true })
  reminderSentAt?: Date | null;

  /**
   * The id we sent to Google as `event.id`. Stored rather than re-derived so
   * update and delete never depend on the derivation staying stable.
   */
  @Column({
    type: 'varchar',
    length: 1024,
    name: 'calendar_event_id',
    nullable: true,
  })
  calendarEventId?: string | null;

  /**
   * The provider `calendar_event_id` belongs to (`google`, `fake`, later
   * `microsoft`). Updates and cancellations go back to it even after the
   * company switches provider.
   */
  @Column({
    type: 'varchar',
    length: 30,
    name: 'calendar_provider',
    nullable: true,
  })
  calendarProvider?: string | null;

  /**
   * The id of the meeting at the link provider (Zoom), when the link does not
   * come from the calendar itself. Saved the moment it is created, so a retry
   * reuses it instead of creating a second meeting.
   */
  @Column({
    type: 'varchar',
    length: 255,
    name: 'conference_meeting_id',
    nullable: true,
  })
  conferenceMeetingId?: string | null;

  /**
   * The provider `conference_meeting_id` belongs to (`zoom`, `fake`), so it is
   * updated and deleted there even after the company changes its choice.
   */
  @Column({
    type: 'varchar',
    length: 30,
    name: 'conference_provider',
    nullable: true,
  })
  conferenceProvider?: string | null;

  /**
   * Google's `hangoutLink`. Only ever written from a provider response —
   * never constructed, which is the bug this feature exists to avoid.
   */
  @Column({ type: 'varchar', length: 500, name: 'meeting_url', nullable: true })
  meetingUrl?: string | null;

  /**
   * The work queue for calendar reconciliation. `pending` rows are picked up
   * by the maintenance sweep; the column is durable, so a failed sync is
   * retried after a restart rather than lost.
   *
   * pending | synced | failed | disabled | cancelling
   */
  @Column({
    type: 'varchar',
    length: 20,
    name: 'calendar_sync_status',
    default: 'pending',
  })
  calendarSyncStatus: string;

  @Column({ type: 'timestamptz', name: 'calendar_synced_at', nullable: true })
  calendarSyncedAt?: Date | null;

  /** Last failure reason, kept for support rather than shown to the manager. */
  @Column({ type: 'text', name: 'calendar_error', nullable: true })
  calendarError?: string | null;

  /** How many times reconciliation has failed; drives backoff and give-up. */
  @Column({ type: 'int', name: 'calendar_attempts', default: 0 })
  calendarAttempts: number;

  /**
   * Per-user calendar mode: whose signed-in account `calendar_event_id` lives
   * on. Updates and cancellations must use that account even after the
   * meeting's manager changes.
   */
  @Column({ type: 'uuid', name: 'calendar_owner_user_id', nullable: true })
  calendarOwnerUserId?: string | null;

  /**
   * SEQUENCE of the emailed .ics invite sent while the organiser had no
   * connected calendar. 0 = none outstanding. A later invite with a higher
   * number replaces the earlier one in the attendee's calendar.
   */
  @Column({ type: 'int', name: 'ics_sequence', default: 0 })
  icsSequence: number;

  @BeforeInsert()
  assignBadgeCode(): void {
    if (!this.o3Code) {
      // 10 digits, not the helper's 4-digit default. `o3_code` is UNIQUE, and
      // a 4-digit namespace holds only 10,000 codes — at ~1,000 rows roughly
      // one insert in ten already fails on the unique constraint, and
      // generating a recurring series inserts many rows back to back.
      this.o3Code = generatePrefixedCode('O3', 10);
    }
  }
}
