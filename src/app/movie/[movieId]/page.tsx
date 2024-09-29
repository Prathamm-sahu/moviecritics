import { Button } from '@/components/ui/button'
import { SquarePen, Trash, Trash2 } from 'lucide-react'
import { FC } from 'react'

interface PageProps {
  
}

const Page: FC<PageProps> = ({}) => {
  return (
    <div className="min-h-screen">
      <main className="">
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-4xl font-medium text-gray-800">Star Wars: A New Hope</h2>
            <span className=" text-xl md:text-4xl font-bold text-indigo-600">8.33/10</span>
          </div>
          {[9, 8, 8].map((rating, index) => (
            <div key={index} className="border-[3px] border-gray-400 p-4 mb-4 space-y-4">
              <div className="flex justify-between items-start">
                <p className="text-lg text-gray-900 mb-2">This is the best movie ever! I really enjoyed it.</p>
                <span className="text-xl font-bold text-indigo-600">{rating}/10</span>
              </div>
              <div className="flex justify-between items-center ">
                <span className='italic font-medium'>By Amitav Khandelwal</span>
                <div className="space-x-2">
                  <button className="hover:text-indigo-600">
                    <SquarePen className="w-5 h-5 text-gray-600 " />
                  </button>
                  <button className="hover:text-indigo-600">
                    <Trash className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Page