import { isDefaultLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { Costume } from '@prisma/client'

interface Props {
  costume: Costume
}

const CostumeMetadata = async ({ costume }: Props) => {
  const { name, nameEn, isOfficialName } = costume
  const { costumes: t } = await getDictionary()
  return (
    <div className='text-left grid gap-1 [&_]:text-xs [&_]:text-gray-500'>
      <div>
        <span className='pr-1'>{t.costumeNameType}:</span>
        <span>{isOfficialName ? t.official : t.unofficial}</span>
      </div>
      <h2 className='font-bold text-lg text-primary'>{isDefaultLocale ? name : nameEn}</h2>
      {!isDefaultLocale && <div>{name}</div>}
    </div>
  )
}

export default CostumeMetadata
