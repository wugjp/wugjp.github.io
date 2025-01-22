import { getYouTubeChannel, listYouTubeChannels } from '@/actions/youtube'
import getMetadata from '@/components/common/Meta'
import { getDictionary } from '@/i18n/dictionaries'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import YouTubeChannelVideosPage from './pages/[page]/page'

interface Props {
  params: Promise<{ id?: string; page?: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata | null> => {
  const p = await params
  const { id } = p
  const page = parseInt((p.page as string) || '1')
  if (!id || isNaN(page) || page < 1) {
    return null
  }
  const channel = await getYouTubeChannel(id)
  if (!channel) {
    return null
  } else {
    const { youtube: t } = await getDictionary()
    const title = `${channel.title} - ${t.title}`
    const description = `${channel.title}: ${t.description}`
    const meta = await getMetadata(title, description)
    return meta
  }
}

export const generateStaticParams = async () => {
  const channels = await listYouTubeChannels()
  return channels.map((channel) => ({ id: channel.id.toString() }))
}

const YouTubeChannel = async ({ params }: Props) => {
  const p = await params
  const { id } = p
  const page = '1'
  if (!id) {
    notFound()
  }
  return YouTubeChannelVideosPage({
    params: Promise.resolve({ id, page }),
  })
}

export default YouTubeChannel
