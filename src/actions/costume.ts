import { CacheTag } from '@/lib/cache'
import prisma from '@/lib/prisma'
import { unstable_cache } from 'next/cache'

export const getCostume = unstable_cache(
  async (id: number) =>
    prisma.costume.findUnique({
      include: {
        images: {
          where: {
            costumeId: id,
          },
          orderBy: {
            displayOrder: 'asc',
          },
          take: 1,
        },
      },
      where: {
        id,
      },
    }),
  undefined,
  { tags: [CacheTag('Costumes')] }
)

export const listCostumes = unstable_cache(
  async () =>
    prisma.costume.findMany({
      include: {
        images: {
          orderBy: {
            displayOrder: 'asc',
          },
          take: 1,
        },
      },
      orderBy: {
        displayOrder: 'asc',
      },
    }),
  undefined,
  { tags: [CacheTag('Costumes')] }
)

export const listCostumeTweets = unstable_cache(
  async (costumeId: number) =>
    prisma.costumeTweet.findMany({
      where: {
        costumeId,
      },
      orderBy: {
        tweetId: 'asc',
      },
    }),
  undefined,
  { tags: [CacheTag('Costumes')] }
)
