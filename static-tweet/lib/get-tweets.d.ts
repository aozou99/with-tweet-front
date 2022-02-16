interface Tweet {
  tag: string
  data: {
    id: string
    avatar: {
      normal: string
    }
    name: string
    username: string
    createdAt: number
    heartCount: string
    ctaType: string
    ctaCount: string
    type: string
  }
  nodes: { tag: string; nodes: any[]; props?: any }[]
}

interface Tweets {
  [id: string]: Tweet[]
}

export default async function getTweets(ids: string[]): Tweets
