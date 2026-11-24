import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({ name: 'v_interview_stats', synchronize: false })
export class InterviewStatsView {
  @ViewColumn({ name: 'org_id' })
  orgId: string;

  @ViewColumn({ name: 'metric_date' })
  metricDate: string;

  @ViewColumn({ name: 'total_interviews' })
  totalInterviews: string;

  @ViewColumn({ name: 'completed_interviews' })
  completedInterviews: string;

  @ViewColumn({ name: 'no_show_interviews' })
  noShowInterviews: string;

  @ViewColumn({ name: 'cancelled_interviews' })
  cancelledInterviews: string;

  @ViewColumn({ name: 'duration_sum' })
  durationSum: string;

  @ViewColumn({ name: 'duration_samples' })
  durationSamples: string;
}
