import Link from 'next/link'
import { Layout } from '../components/Layout'
import { ChevronDoubleRightIcon } from '@heroicons/react/solid'
import {
  fetchTranslatedTweet,
  useQueryTranslatedTweet,
} from '../hooks/useQueryTranslatedTweet'
import { TranslatedTweetItem } from '../components/TranslatedTweetItem'
import { TranslatedTweet } from '../types/types'
import { VFC } from 'react'

interface Props {
  tweets: TranslatedTweet[]
}

const Home: VFC<Props> = ({ tweets }) => {
  const { status, data } = useQueryTranslatedTweet({ initailData: tweets })
  if (status === 'loading') return <Layout title="home">{'Loading...'}</Layout>
  if (status === 'error') return <Layout title="home">{'Error'}</Layout>
  return (
    <Layout title="home">
      <p className="my-5 text-blue-500 text-xl font-bold">Fetching useQuery</p>
      <ul>
        {data?.map((tweet) => (
          <TranslatedTweetItem key={tweet.tweet_id} translatedTweet={tweet} />
        ))}
      </ul>
      <Link href="/read-cache" passHref>
        <div className="mt-20 flex items-center cursor-pointer">
          <ChevronDoubleRightIcon className="h-5 w-5 mx-1 text-blue-500" />
        </div>
      </Link>
    </Layout>
  )
}

export default Home

export async function getStaticProps() {
  const tweets = await fetchTranslatedTweet()
  return {
    props: { tweets },
  }
}
