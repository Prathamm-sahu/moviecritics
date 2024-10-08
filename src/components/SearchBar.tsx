'use client'

import { useQuery } from '@tanstack/react-query'
import { Prisma, Movie } from '@prisma/client'
import axios from 'axios'
import debounce from 'lodash.debounce'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useCallback, useEffect, useRef, useState } from 'react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = ({}) => {
  const [input, setInput] = useState<string>('')
  const pathname = usePathname()
  const commandRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useOnClickOutside(commandRef, () => {
    setInput('')
  })

  const request = debounce(async () => {
    refetch() 
  }, 300)

  const debounceRequest = useCallback(() => {
    request()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    isFetching,
    data: queryResults,
    refetch,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      if (!input) return []
      const { data } = await axios.get(`/api/search?q=${input}`)
      return data as (Movie & {
        _count: Prisma.MovieCountOutputType
      })[]
    },
    queryKey: ['search-query'],
    enabled: false,
    initialData: [],
  })

  useEffect(() => {
    setInput('')
  }, [pathname])

  console.log('Query Results:', queryResults)
  console.log("Input", input)

  return (
    <Command
      ref={commandRef}
      className='relative rounded-lg border max-w-lg z-50 overflow-visible'>
      <CommandInput
        onValueChange={(text) => {
          setInput(text)
          debounceRequest()
        }}
        value={input}
        className='outline-none border-none focus:border-none focus:outline-none ring-0'
        placeholder='Search movies...'
      />

      {input.length > 0 && (
        <CommandList className='absolute bg-white top-full inset-x-0 shadow rounded-b-md'>
          {isFetched && queryResults.length === 0 &&  <CommandEmpty>No results found.</CommandEmpty>}
          {((queryResults?.length > 0)) && (
            <CommandGroup heading='Movies'>
              {queryResults?.map((movie) => (
                <CommandItem
                  onSelect={(e) => {
                    router.push(`/movie/${movie.id}`)
                    router.refresh()
                  }}
                  key={movie.id}
                  value={movie.name}>
                  <a href={`/movie/${movie.id}`}>{movie.name}</a>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      )}
    </Command>
  )
}

export default SearchBar