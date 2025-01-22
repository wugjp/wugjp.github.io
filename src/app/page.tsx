import Container from '@/components/common/Container'
import MenuSection from '@/components/home/MenuSection'
import { getDictionary } from '@/i18n/dictionaries'

export default async function Home() {
  const { home: t } = await getDictionary()
  return (
    <Container className='max-w-screen-sm text-center px-8 md:px-2'>
      <div className='px-0 sm:px-8'>
        <MenuSection
          title={t.title}
          description={t.description}
          items={[
            { icon: '🎵', name: t.songs, href: '/songs' },
            { icon: '💿', name: t.records, href: '/records', enabled: false },
            { icon: '👤', name: t.artists, href: '/artists', enabled: false },
            { icon: '🎬', name: t.youtube, href: '/youtube' },
            { icon: '👗', name: t.costumes, href: '/costumes' },
            { icon: '🗓️', name: t.events, href: 'https://www.eventernote.com/actors/6988/events' },
            { icon: '📝', name: t.articles, href: '/articles', enabled: false },
          ]}
        />
      </div>
    </Container>
  )
}
