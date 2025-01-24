import prisma from '@/lib/prisma'

export const getSong = async (id: number) =>
  prisma.song.findFirst({
    where: {
      id,
    },
  })

export const listSongs = async () =>
  prisma.song.findMany({
    orderBy: {
      kana: 'asc',
    },
  })
