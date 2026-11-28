import { PayrollRunInputEntity } from './payroll-run-input.entity';

describe('PayrollRunInputEntity assignCode', () => {
  it('generates a 20-hex-char PAY_INPUT code that fits the varchar(30) column', () => {
    const entity = new PayrollRunInputEntity();

    entity.assignCode();

    // payroll_run_input_code is UNIQUE across every company/section/run
    // period in the table, with no deleted_at exclusion, so the space never
    // shrinks. A random N-digit numeric code is drawn from a bounded space
    // and inevitably collides once the table crosses roughly sqrt(10^N)
    // rows -- this already happened once at 4 digits (10,000 combinations)
    // and recurred after "fixing" it by widening to 10 digits (10 billion
    // combinations), which only raised the row count needed to hit the same
    // wall. Deriving the code from a fresh UUID (16^20 keyspace) removes the
    // collision class entirely instead of just deferring it again.
    expect(entity.payroll_run_input_code).toMatch(/^PAY_INPUT_[0-9A-F]{20}$/);
    expect(entity.payroll_run_input_code.length).toBe(30);
  });

  it('does not overwrite an already-assigned code', () => {
    const entity = new PayrollRunInputEntity();
    entity.payroll_run_input_code = 'PAY_INPUT_0000000001';

    entity.assignCode();

    expect(entity.payroll_run_input_code).toBe('PAY_INPUT_0000000001');
  });

  it('draws from a wide enough range that two generated codes practically never collide', () => {
    const codes = new Set<string>();
    for (let i = 0; i < 1000; i += 1) {
      const entity = new PayrollRunInputEntity();
      entity.assignCode();
      codes.add(entity.payroll_run_input_code);
    }

    // With a 16^20 keyspace, a collision across 1,000 draws is
    // astronomically unlikely; the old N-digit numeric schemes (bounded to
    // 1e4 or 1e10 combinations, shared across every company/section/period
    // ever inserted) would eventually reproduce duplicates as the table grew.
    expect(codes.size).toBe(1000);
  });
});
