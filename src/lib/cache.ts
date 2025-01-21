type CacheTagsType = 'Songs' | 'Posts' | 'Articles' | 'Costumes' | 'Events' | 'YouTube' | 'Blogs' | 'Artists'

export const CacheTags: CacheTagsType[] = ['Songs', 'Posts', 'Articles', 'Costumes', 'Events', 'YouTube', 'Blogs', 'Artists']

export const CacheTag = (tag: CacheTagsType) => {
  return tag as string
}
