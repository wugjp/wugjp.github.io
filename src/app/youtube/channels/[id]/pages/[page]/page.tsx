import { getNumberOfYouTubeVideos, getYouTubeChannel, listYouTubeChannels, listYouTubeVideos } from '@/actions/youtube'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import getMetadata from '@/components/common/Meta'
import Pagenation from '@/components/common/Pagenation'
import Title from '@/components/common/Title'
import VideoCollection from '@/components/youtube/VideoCollection'
import { getDictionary } from '@/i18n/dictionaries'
import Config from '@/lib/config'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { format } from 'util'

interface Props {
  params: Promise<{ id: string; page: string }>
}

export const generateStaticParams = async () => {
  const channels = await listYouTubeChannels()
  const params = []
  for (const channel of channels) {
    const pages = await getNumberOfYouTubeVideos(channel.id)
    const indices = Array.from({ length: pages }, (_, i) => i + 1)
    for (const page of indices) {
      params.push({ id: channel.id.toString(), page: page.toString() })
    }
  }
  return params
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

const YouTubeChannelVideosPage = async ({ params }: Props) => {
  const p = await params
  const { id } = p
  const page = parseInt(p.page as string)
  if (isNaN(page) || page < 1) {
    notFound()
  }
  const channel = await getYouTubeChannel(id)
  if (!channel) {
    notFound()
  }

  const offset = (page - 1) * Config.videosPerPage
  const videos = await listYouTubeVideos(id, offset, Config.videosPerPage + 1)
  if (videos.length === 0) {
    notFound()
  }
  const hasNext = videos.length > Config.videosPerPage
  const { youtube: t } = await getDictionary()
  return (
    <Container className='max-w-screen-lg text-center px-2 md:px-2 py-4'>
      <Breadcrumbs
        items={[
          { name: 'YouTube', href: '/youtube' },
          {
            name: `${channel.title}`,
            href: `/youtube/channels/${id}`,
          },
        ]}
      />
      <Title title={t.title} description={format(t.fVideoList, channel.title)} />
      <VideoCollection videos={videos.slice(0, Config.videosPerPage)} />
      <Pagenation current={page} hasNext={hasNext} path={(page: number) => `/youtube/channels/${id}/pages/${page}`} />
    </Container>
  )
}

export default YouTubeChannelVideosPage
