import { graphqlResponseInterface } from './interfaces'

const graphqlURL = 'http://localhost:7890/graphql'

const makeHeaders = (query: string) => ({
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query }),
})

export const makeGraphQLCall = (query: string, returnKey: keyof graphqlResponseInterface["data"]) => {
  return fetch(graphqlURL, makeHeaders(query))
    .then(res => res.json())
    .then(({ data }: graphqlResponseInterface) => data[returnKey])
    .catch(err => console.log(err))
}
