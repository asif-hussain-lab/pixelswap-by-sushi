import { initGraphQLTada } from 'gql.tada'
import type { Scalars } from 'src/lib/types/scalars.js'
import type { introspection } from './bentobox-env.js'

export const graphql = initGraphQLTada<{
  introspection: introspection
  scalars: Scalars
}>()
