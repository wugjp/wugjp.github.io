import prisma from '@/lib/prisma'

async function main() {
  const videos = await prisma.youTubeVideo.findMany({
    select: {
      id: true,
      publishedTimestamp: true,
    },
  })

  const promises = []
  for (const video of videos) {
    const timestamp = Number(video.publishedTimestamp) / 1000
    promises.push(
      prisma.youTubeVideo.update({
        where: {
          id: video.id,
        },
        data: {
          publishedTimestamp: timestamp,
        },
      })
    )
  }
  await Promise.allSettled(promises)
}

main()
