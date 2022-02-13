import { ChevronDoubleLeftIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useQueryClient } from 'react-query'
import { Layout } from '../components/Layout'
import { TranslatedTweetItem } from '../components/TranslatedTweetItem'
import { TranslatedTweet } from '../types/types'

const ReadCache = () => {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<TranslatedTweet[]>('tweets')
  return (
    <Layout title="read cache">
      <p className="my-5 text-blue-500 text-xl font-bold">
        Read out cache data
      </p>
      <ul>
        {data?.map((tweet) => (
          <TranslatedTweetItem key={tweet.tweet_id} translatedTweet={tweet} />
        ))}
      </ul>
      <Link href="/" passHref>
        <div className="mt-20 flex items-center cursor-pointer">
          <ChevronDoubleLeftIcon className="h-5 w-5 mx-1 text-blue-500" />
        </div>
      </Link>
    </Layout>
  )
}

export default ReadCache
