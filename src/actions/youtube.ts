import { CacheTag } from '@/lib/cache'
import prisma from '@/lib/prisma'
import { unstable_cache } from 'next/cache'

export const listYouTubeChannels = unstable_cache(() => prisma.youTubeChannel.findMany({}))

export const getYouTubeChannel = unstable_cache(
  async (id: string) =>
    prisma.youTubeChannel.findUnique({
      where: {
        id,
      },
    }),
  undefined,
  { tags: [CacheTag('YouTube')] }
)

export const listYouTubeVideos = unstable_cache(
  async (channelId: string, offset: number, limit: number) =>
    prisma.youTubeVideo.findMany({
      where: {
        channelId,
      },
      orderBy: {
        publishedTimestamp: 'asc',
      },
      skip: offset,
      take: limit,
    }),
  undefined,
  { tags: [CacheTag('YouTube')] }
)

export const getNumberOfYouTubeVideos = unstable_cache(
  async (channelId: string) =>
    prisma.youTubeVideo.count({
      where: {
        channelId,
      },
    }),
  undefined,
  { tags: [CacheTag('YouTube')] }
)
