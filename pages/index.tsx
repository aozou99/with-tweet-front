import { Layout } from '../components/Layout'
import { fetchTranslatedTweetIds } from '../hooks/useQueryTranslatedTweet'
import { TranslatedTweet } from '../types/types'
import { VFC } from 'react'
import getTweets from '../static-tweet/lib/get-tweets'
import Tweet from '../static-tweet/components/post/tweet'
import { Tweets } from '../static-tweet/lib/tweets'
import Link from 'next/link'

interface Props {
  tweets: TranslatedTweet[]
  ids: string[]
}

const Home: VFC<Props> = ({ tweets, ids }) => {
  return (
    <Layout title="home">
      <Tweets.Provider value={tweets}>
        {ids.map((id) => (
          <Link
            key={`link-${id}`}
            href={`/translate/${id}`}
            as="/xxx/xxx"
            passHref
          >
            <Tweet key={id} id={id} />
          </Link>
        ))}
      </Tweets.Provider>
    </Layout>
  )
}

export default Home

export async function getStaticProps() {
  const ids = await fetchTranslatedTweetIds()
  const tweets = await getTweets(ids)
  return {
    props: { tweets, ids },
  }
}
