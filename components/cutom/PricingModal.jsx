import Lookup from '@/data/Lookup'
import React from 'react'
import { Button } from '../ui/button'

function PricingModal() {
  return (
    <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
        {Lookup.PRICING_OPTIONS.map((option, index) => (
          <div key={index} className='p-7 rounded-xl border flex flex-col gap-3'>
            <h2 className='text-2xl font-bold'>{option.name}</h2>
            <h2 className='font-medium text-lg'>{option.tokens} Tokens</h2>
            <p className='text-gray-400'>{option.desc}</p>
            <h2 className='font-bold text-4xl text-center mt-6'>${option.price}</h2>
            <Button className="mt-auto cursor-pointer">Upgrade to {option.name}</Button>
          </div>
        ))}
    </div>
  )
}

export default PricingModal