import { listSongs } from '@/actions/songs'
import IndexHeading from '@/components/common/IndexHeading'
import { jpIndexNavItems } from '@/components/common/IndexNav'
import { Song } from '@prisma/client'
import SongCollection from './SongCollection'

const IndexedSongCollection = async () => {
  const songs = await listSongs()
  const navItems = jpIndexNavItems
  const groupedSongs = new Map<string, Song[]>()
  for (const song of songs) {
    let key = navItems.length - 1
    for (let i = 1; i <= navItems.length; i++) {
      if (song.kana.charAt(0) < navItems[i]) {
        key = i - 1
        break
      }
    }
    const newItems = [...(groupedSongs.get(navItems[key]) || []), song]
    groupedSongs.set(navItems[key], newItems)
  }
  return (
    <div>
      {navItems.map((i) => (
        <div key={i}>
          <IndexHeading id={i} />
          <SongCollection songs={groupedSongs.get(i) || []} />
        </div>
      ))}
    </div>
  )
}

export default IndexedSongCollection
