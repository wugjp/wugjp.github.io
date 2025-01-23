import prisma from '@/lib/prisma'
import * as dotenv from 'dotenv'
import { google } from 'googleapis'

dotenv.config()

// Array.from($$("#contents ytd-thumbnail > a")).map(a => a.getAttribute("href")).filter(a => a.startsWith("/watch?v=")).map(a => a.replace("/watch?v=", ""))
const ids: string[] = [
  // TODO: do not forget to clean up
]

async function main() {
  const chunks = []
  for (let i = 0; i < ids.length; i += 50) {
    chunks.push(ids.slice(i, i + 50))
  }

  const promises = []
  for (const chunk of chunks) {
    const youtube = google.youtube({ version: 'v3', auth: process.env.GOOGLE_API_KEY })
    const videos = await youtube.videos.list({
      part: ['id', 'snippet'],
      id: chunk,
    })
    for (const video of videos.data.items!) {
      const publishedAt = video.snippet!.publishedAt
      const publishedTimestamp = new Date(publishedAt!).getTime() / 1000
      const data = {
        id: video.id!,
        title: video.snippet!.title!,
        channelId: video.snippet!.channelId!,
        publishedTimestamp,
      }
      promises.push(
        prisma.youTubeVideo.upsert({
          create: data,
          update: data,
          where: {
            id: data.id,
          },
        })
      )
    }
  }
  await Promise.allSettled(promises)
}

main()
