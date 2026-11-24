import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({ name: 'v_sourcing_roi', synchronize: false })
export class SourcingRoiView {
  @ViewColumn({ name: 'org_id' })
  orgId: string;

  @ViewColumn({ name: 'metric_date' })
  metricDate: string;

  @ViewColumn({ name: 'campaign_count' })
  campaignCount: string;

  @ViewColumn({ name: 'run_count' })
  runCount: string;

  @ViewColumn({ name: 'candidate_count' })
  candidateCount: string;

  @ViewColumn({ name: 'contacted_count' })
  contactedCount: string;

  @ViewColumn({ name: 'responded_count' })
  respondedCount: string;

  @ViewColumn({ name: 'interested_count' })
  interestedCount: string;
}
