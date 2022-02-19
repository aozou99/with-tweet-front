import { Layout } from '../components/Layout'
import { fetchTranslatedTweetIds } from '../hooks/useQueryTranslatedTweet'
import { VFC } from 'react'
import getTweets, { Tweets } from '../static-tweet/lib/get-tweets'
import Tweet from '../static-tweet/components/post/tweet'
import { Tweets as TweetsContext } from '../static-tweet/lib/tweets'

interface Props {
  tweets: Tweets[]
  ids: string[]
}

const Home: VFC<Props> = ({ tweets, ids }) => {
  return (
    <Layout title="home">
      <TweetsContext.Provider value={tweets}>
        {ids.map((id) => (
          <Tweet key={id} id={id} />
        ))}
      </TweetsContext.Provider>
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
