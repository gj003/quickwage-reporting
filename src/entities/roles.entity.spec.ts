import { getMetadataArgsStorage } from 'typeorm';
import { RoleEntity } from './roles.entity';

describe('RoleEntity', () => {
  it('keeps role uniqueness scoped to its name, code, and company', () => {
    const metadata = getMetadataArgsStorage();
    const roleCodeColumn = metadata.columns.find(
      ({ target, propertyName }) =>
        target === RoleEntity && propertyName === 'role_code',
    );
    const roleUnique = metadata.uniques.find(
      ({ target, columns }) =>
        target === RoleEntity &&
        Array.isArray(columns) &&
        columns.join(',') === 'name,role_code,company_id',
    );

    expect(roleCodeColumn?.options.unique).not.toBe(true);
    expect(roleUnique).toBeDefined();
  });
});
