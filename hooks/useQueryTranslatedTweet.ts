import { request } from 'graphql-request'
// import { useQuery } from 'react-query'
import { TranslatedTweet } from '../types/types'
import {
  GET_TRANSLATED_TWEET,
  GET_TRANSLATED_TWEETS_IDS,
} from '../queries/queries'
interface TranslatedTweetsRes {
  latestTweets: TranslatedTweet[]
}
interface TranslatedTweetRes {
  tweet: TranslatedTweet
}

export const fetchTranslatedTweetIds = async () => {
  const { latestTweets } = await request<TranslatedTweetsRes>(
    process.env['NEXT_PUBLIC_WITH_TWEET_API_URL'],
    GET_TRANSLATED_TWEETS_IDS
  )
  return latestTweets.map((v) => v.tweet_id)
}

export const fetchTranslatedTweet = async (id: string) => {
  const { tweet } = await request<TranslatedTweetRes>(
    process.env['NEXT_PUBLIC_WITH_TWEET_API_URL'],
    GET_TRANSLATED_TWEET,
    { id }
  )
  return tweet
}

// interface userQueryProps {
//   initailData: TranslatedTweet[]
// }

// export const useQueryTranslatedTweet = ({ initailData }: userQueryProps) => {
//   return useQuery<TranslatedTweet[], Error>({
//     queryKey: 'tweets',
//     queryFn: fetchTranslatedTweet,
//     staleTime: Infinity,
//     refetchOnWindowFocus: false,
//     initialData: initailData,
//   })
// }
