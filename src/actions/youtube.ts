import prisma from '@/lib/prisma'

export const listYouTubeChannels = () => prisma.youTubeChannel.findMany({})

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
