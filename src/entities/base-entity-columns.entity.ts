import { SharedEntity } from './shared.entity';

/**
 * BaseEntityColumns re-uses the existing SharedEntity timestamp columns for
 * the new domain modules.
 */
export abstract class BaseEntityColumns extends SharedEntity {}
