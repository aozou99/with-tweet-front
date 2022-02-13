import { gql } from 'graphql-request'

export const GET_TRANSLATED_TWEET = gql`
  query GetTranslatedTweets {
    latestTweets {
      translated_text
      origin_text
      tweet_id
    }
  }
`
