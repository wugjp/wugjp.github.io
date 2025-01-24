import prisma from '@/lib/prisma'
import { unstable_cache } from 'next/cache'

export const listYouTubeChannels = unstable_cache(() => prisma.youTubeChannel.findMany({}))

export const getYouTubeChannel = async (id: string) =>
  prisma.youTubeChannel.findUnique({
    where: {
      id,
    },
  })

export const listYouTubeVideos = async (channelId: string, offset: number, limit: number) =>
  prisma.youTubeVideo.findMany({
    where: {
      channelId,
    },
    orderBy: {
      publishedTimestamp: 'asc',
    },
    skip: offset,
    take: limit,
  })

export const getNumberOfYouTubeVideos = async (channelId: string) =>
  prisma.youTubeVideo.count({
    where: {
      channelId,
    },
  })
