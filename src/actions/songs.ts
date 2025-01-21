import { CacheTag } from '@/lib/cache'
import prisma from '@/lib/prisma'
import { unstable_cache } from 'next/cache'

export const getSong = unstable_cache(
  async (id: number) =>
    prisma.song.findFirst({
      where: {
        id,
      },
    }),
  undefined,
  { tags: [CacheTag('Songs')] }
)

export const listSongs = unstable_cache(
  async () =>
    prisma.song.findMany({
      orderBy: {
        kana: 'asc',
      },
    }),
  undefined,
  { tags: [CacheTag('Songs')] }
)
