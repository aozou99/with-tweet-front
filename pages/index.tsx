import Link from 'next/link'
import { Layout } from '../components/Layout'
import { RocketItem } from '../components/RocketItem'
import { useQueryRockets } from '../hooks/useQueryRockets'
import { ChevronDoubleRightIcon } from '@heroicons/react/solid'
export default function Home() {
  const { status, data } = useQueryRockets()
  if (status === 'loading') return <Layout title="home">{'Loading...'}</Layout>
  if (status === 'error') return <Layout title="home">{'Error'}</Layout>
  return (
    <Layout title="home">
      <p className="my-5 text-blue-500 text-xl font-bold">Fetching useQuery</p>
      <ul>
        {data?.map((rocket) => (
          <RocketItem key={rocket.id} rocket={rocket} />
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
