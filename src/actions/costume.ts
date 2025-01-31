import prisma from '@/lib/prisma'
import { CostumeType } from '@prisma/client'

export const getCostume = async (id: number) =>
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
  })

export const listCostumes = async (costumeType?: CostumeType) =>
  prisma.costume.findMany({
    include: {
      images: {
        orderBy: {
          displayOrder: 'asc',
        },
        take: 1,
      },
    },
    where: {
      costumeType,
    },
    orderBy: {
      displayOrder: 'asc',
    },
  })

export const listCostumeTweets = async (costumeId: number) =>
  prisma.costumeTweet.findMany({
    where: {
      costumeId,
    },
    orderBy: {
      tweetId: 'asc',
    },
  })

export const listYouTubeVideosByCostume = async (costumeId: number) =>
  prisma.costumeYouTubeVideo.findMany({
    include: {
      video: true,
    },
    where: {
      costumeId,
    },
    orderBy: {
      video: {
        publishedTimestamp: 'asc',
      },
    },
  })

export const listCostumeImages = async (id: number) =>
  await prisma.costumeImage.findMany({
    where: {
      costumeId: id,
    },
    orderBy: {
      displayOrder: 'asc',
    },
  })

export const getCostumeModel = async (id: number) =>
  prisma.costumeModel.findFirst({
    where: {
      id,
    },
  })

export const listCostumeModels = async (id?: number) =>
  prisma.costumeModel.findMany({
    where: {
      costumeId: id,
    },
    orderBy: {
      displayOrder: id ? 'asc' : undefined,
    },
  })
