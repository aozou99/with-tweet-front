import { gql } from 'graphql-request'

export const GET_TRANSLATED_TWEETS_IDS = gql`
  query GetLatestTweetIds {
    latestTweets {
      tweet_id
    }
  }
`

export const GET_TRANSLATED_TWEET = gql`
  query GetTweet {
    tweet(id: "1491019310415822849") {
      translated_text
      origin_text
      tweet_id
    }
  }
`
