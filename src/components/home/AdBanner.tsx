import React from 'react'
import { getBanners } from '@remote/adBanner'
import styled from '@emotion/styled'
import Flex from '@components/share/Flex'
import Text from '@components/share/Text'
import { colors } from 'src/styles/colorPalette'
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

function AdBanner() {
  const { data } = useQuery({
    queryKey: ['adBanners'],
    queryFn: () => getBanners(),
  })

  return (
    <Container>
      <Swiper spaceBetween={8}>
        {data?.map((banner) => {
          return (
            <SwiperSlide key={banner.id}>
              <Link to={banner.link}>
                <Flex direction="column" css={bannerContainerStyle}>
                  <Text bold={true}>{banner.title}</Text>
                  <Text typography="t7">{banner.description}</Text>
                </Flex>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Container>
  )
}

const Container = styled.div`
  padding: 24px;
`
const bannerContainerStyle = css`
  padding: 16px;
  background-color: ${colors.grey};
  border-radius: 4px;
`

export default AdBanner
