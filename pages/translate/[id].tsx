import { Layout } from '../../components/Layout'
import Practice from '../../components/Practice'
import {
  fetchTranslatedTweet,
  fetchTranslatedTweetIds,
} from '../../hooks/useQueryTranslatedTweet'
import { shuffle } from '../../pkg/random/shuffle'
import { PracticeTweet } from '../../types/types'

interface Props {
  tweet: PracticeTweet
}

export default function Translate({ tweet }: Props) {
  if (!tweet) {
    return <Layout title="wait">Loading...</Layout>
  }
  return (
    <Layout title="translate">
      <Practice tweet={tweet} />
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const ids = await fetchTranslatedTweetIds()
  return { paths: ids.map((v) => `/translate/${v}`), fallback: true }
}

type StaticProps = { params: { id: string } }
export const getStaticProps = async ({ params }: StaticProps) => {
  const tweet = await fetchTranslatedTweet(params.id)
  const ptcTweet: PracticeTweet = {
    ...tweet,
    choices: shuffle([...tweet.translated_text.split(' ')]),
  }
  return {
    props: { tweet: ptcTweet },
    revalidate: 1,
  }
}
