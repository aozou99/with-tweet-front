import { Layout } from '../components/Layout'
import { fetchTranslatedTweet } from '../hooks/useQueryTranslatedTweet'
import { TranslatedTweet } from '../types/types'
import { VFC } from 'react'
import getTweets from '../static-tweet/lib/get-tweets'
import Tweet from '../static-tweet/components/post/tweet'
import { Tweets } from '../static-tweet/lib/tweets'

interface Props {
  tweets: TranslatedTweet[]
  ids: string[]
}

const Home: VFC<Props> = ({ tweets, ids }) => {
  return (
    <Layout title="home">
      <Tweets.Provider value={tweets}>
        {ids.map((id) => (
          <Tweet key={id} id={id} />
        ))}
      </Tweets.Provider>
    </Layout>
  )
}

export default Home

export async function getStaticProps() {
  const translatedTweets = await fetchTranslatedTweet()
  const ids = translatedTweets.map<string>((x) => x.tweet_id)
  const tweets = await getTweets(ids)
  return {
    props: { tweets, ids },
  }
}
