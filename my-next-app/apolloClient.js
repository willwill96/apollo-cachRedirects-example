import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

export default function createApolloClient(initialState, ctx) {
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: new HttpLink({
      uri: 'http://localhost:4000/graphql',
      credentials: 'same-origin',
    }),
    cache: new InMemoryCache({
      cacheRedirects: {
        Query: {
          bookById: (_, args, { getCacheKey }) =>
            getCacheKey({ __typename: 'Book', id: args.id }),
        },
      },
    }).restore(initialState),
  })
}
