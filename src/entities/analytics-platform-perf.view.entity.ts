import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({ name: 'v_platform_perf', synchronize: false })
export class PlatformPerformanceView {
  @ViewColumn({ name: 'org_id' })
  orgId: string;

  @ViewColumn({ name: 'platform' })
  platform: string;

  @ViewColumn({ name: 'metric_date' })
  metricDate: string;

  @ViewColumn({ name: 'sourced_count' })
  sourcedCount: string;

  @ViewColumn({ name: 'contacted_count' })
  contactedCount: string;

  @ViewColumn({ name: 'responded_count' })
  respondedCount: string;

  @ViewColumn({ name: 'interested_count' })
  interestedCount: string;

  @ViewColumn({ name: 'avg_fit_score' })
  averageFitScore: string;
}
