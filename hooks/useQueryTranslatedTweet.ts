import { request } from 'graphql-request'
import { useQuery } from 'react-query'
import { TranslatedTweet } from '../types/types'
import { GET_TRANSLATED_TWEET } from '../queries/queries'
interface TranslatedTweetsRes {
  latestTweets: TranslatedTweet[]
}
interface userQueryProps {
  initailData: TranslatedTweet[]
}

export const fetchTranslatedTweet = async () => {
  const { latestTweets } = await request<TranslatedTweetsRes>(
    process.env['NEXT_PUBLIC_WITH_TWEET_API_URL'],
    GET_TRANSLATED_TWEET
  )
  return latestTweets
}

export const useQueryTranslatedTweet = ({ initailData }: userQueryProps) => {
  return useQuery<TranslatedTweet[], Error>({
    queryKey: 'tweets',
    queryFn: fetchTranslatedTweet,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    initialData: initailData,
  })
}
