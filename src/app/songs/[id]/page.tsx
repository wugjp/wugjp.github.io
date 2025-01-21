import { getSong, listSongs } from '@/actions/songs'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import getMetadata from '@/components/common/Meta'
import SongMetadata from '@/components/songs/SongMetadata'
import { isDefaultLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata | null> => {
  const p = await params
  const id = parseInt(p.id)
  if (isNaN(id) || id < 1) {
    return null
  }
  const song = await getSong(id)
  if (!song) {
    return null
  } else {
    const { songs: t } = await getDictionary()
    const title = `${isDefaultLocale ? song.title : song.titleEn} - ${t.title}`
    const description = t.description
    const meta = await getMetadata(title, description)
    return meta
  }
}

export const generateStaticParams = async () => {
  const costumes = await listSongs()
  return costumes.map((costume) => ({ id: costume.id.toString() }))
}

const Song = async ({ params }: Props) => {
  const p = await params
  const id = parseInt(p.id)
  if (isNaN(id) || id < 1) {
    notFound()
  }
  const song = await getSong(id)
  if (!song) {
    notFound()
  }
  const { songs: t } = await getDictionary()
  return (
    <Container className='max-w-screen-lg px-2 md:px-2 py-4'>
      <Breadcrumbs items={[{ name: t.title, href: '/songs' }]} />
      <SongMetadata song={song} />
    </Container>
  )
}

export default Song
