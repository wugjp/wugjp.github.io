interface Props {
  items: string[]
}

export const jpIndexNavItems: string[] = ['', 'あ', 'か', 'さ', 'た', 'な', 'は', 'ま', 'や', 'ら', 'わ']

// from 2014 until 2019
export const yearsIndexNavItems: string[] = Array.from({ length: 6 }, (_, i) => (2014 + i).toString())

const IndexNav = ({ items }: Props) => {
  return (
    <nav className='px-8 flex flex-wrap justify-center space-x-4'>
      {items.map((item) => (
        <a key={item} href={`#${item}`} className='text-secondary text-sm'>
          {item}
        </a>
      ))}
    </nav>
  )
}

export default IndexNav
