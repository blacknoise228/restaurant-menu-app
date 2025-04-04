import Image from 'next/image'

interface MenuItemCardProps {
  item: {
    id: string
    name: string
    description: string
    price: number
    image_url?: string
  }
  onClick?: () => void  
}

export default function MenuItemCardPublic({ item, onClick }: MenuItemCardProps) {
  return (
    <li
      onClick={onClick}
      className="relative z-10 bg-gray-900 rounded-xl shadow-lg border border-gray-700 hover:shadow-teal-500/30 transition-transform transform hover:scale-105 flex flex-col cursor-pointer"
      style={{ minHeight: '340px' }}
    >
      {item.image_url && (
        <div className="relative h-48 w-full shrink-0 p-2 pb-0">
          <div className="relative w-full h-full rounded overflow-hidden">
            <Image
              src={item.image_url}
              alt={item.name}
              fill
              className="object-cover w-full h-full rounded-md"
            />
          </div>
        </div>
      )}

      <div className="p-4 flex flex-col justify-between gap-2 flex-grow">
        <div>
          <h3 className="text-lg font-bold text-white line-clamp-1">{item.name}</h3>
          <p className="text-sm text-gray-400 mt-1 line-clamp-3 min-h-[3.5rem]">
            {item.description}
          </p>
        </div>
        <p className="text-teal-400 font-semibold text-right mt-auto">💰 {item.price} тг</p>
      </div>
    </li>
  )
}