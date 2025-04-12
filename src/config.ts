import type { ImmutableObject } from 'jimu-core'

export interface Config {
  featureUrl: string,
  parentFeatureUrl: string
}

export type IMConfig = ImmutableObject<Config>
