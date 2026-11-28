import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({ name: 'v_flow_funnel', synchronize: false })
export class FlowFunnelView {
  @ViewColumn({ name: 'org_id' })
  orgId: string;

  @ViewColumn({ name: 'window' })
  window: string;

  @ViewColumn({ name: 'computed_date' })
  computedDate: string;

  @ViewColumn({ name: 'flow_count' })
  flowCount: string;

  @ViewColumn({ name: 'conversion_sum' })
  conversionSum: string;

  @ViewColumn({ name: 'conversion_samples' })
  conversionSamples: string;

  @ViewColumn({ name: 'time_to_hire_sum' })
  timeToHireSum: string;

  @ViewColumn({ name: 'time_to_hire_samples' })
  timeToHireSamples: string;

  @ViewColumn({ name: 'scheduled_total' })
  scheduledTotal: string;

  @ViewColumn({ name: 'completed_total' })
  completedTotal: string;
}
