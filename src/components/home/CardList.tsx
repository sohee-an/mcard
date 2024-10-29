import ListRow from '@components/share/ListRow'
import { getCards } from '@remote/card'
import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroll-component'
import { flatten } from 'lodash'
import { useCallback } from 'react'
import Badge from '@components/share/Badge'
import { useNavigate } from 'react-router-dom'

function CardList() {
  const navigate = useNavigate()
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['cards'],
    queryFn: ({ pageParam }: any) => {
      return getCards(pageParam)
    },
    getNextPageParam: (lastPage) => {
      return lastPage.lastVisible
    },
    initialPageParam: null,
  })

  const cards = flatten(data?.pages.map(({ items }: any) => items))

  if (data === null) {
    return null
  }
  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }
    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  return (
    <div>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        next={loadMore}
        loader={<div>loading...</div>}
        scrollThreshold="100px"
      >
        <ul>
          {cards?.map((card, index) => {
            return (
              <ListRow
                key={card.id}
                contents={
                  <ListRow.Texts
                    title={`${index + 1}위`}
                    subTitle={card.name}
                  />
                }
                right={card.payback ? <Badge label={card.payback} /> : null}
                onClick={() => {
                  return navigate(`/card/${card.id}`)
                }}
                withArrow={true}
              />
            )
          })}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

export default CardList
