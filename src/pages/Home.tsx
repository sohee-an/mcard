import { useEffect } from 'react'
import Top from '@components/share/Top'
import { getCards } from 'src/remote/card'
import AdBanner from '@components/home/AdBanner'
import CardList from '@components/home/CardList'

function HomePage() {
  useEffect(() => {
    getCards().then((response) => {
      console.log('res', response)
    })
  })

  return (
    <div>
      <Top
        title="이번 달 독서 추천"
        subTitle="이 달의 추천 도서와 함께 깊이 있는 독서를 시작해보세요"
      />
      <AdBanner />
      <CardList />
    </div>
  )
}

export default HomePage
