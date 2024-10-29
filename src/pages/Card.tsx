import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getCard } from '@remote/card'
import { css } from '@emotion/react'
import Top from '@components/share/Top'
import { removeHtmlTags } from 'src/utiles/removeHtmltags'
import ListRow from '@components/share/ListRow'
import CheckIcon from '@assets/icons/check.svg?react'
import FixedBottomButton from '@components/share/FixedBottomButton'
import Flex from '@components/share/Flex'
import Text from '@components/share/Text'
import { motion } from 'framer-motion'

function Card() {
  const { id = '' } = useParams()

  const { data } = useQuery({
    queryKey: ['card', id],
    queryFn: () => getCard(id),
    enabled: id !== '',
  })
  console.log('data', data)

  if (data == null) {
    return <div>데이터가 없습니다.</div>
  }

  const { name, corpName, promotion, tags, benefit } = data

  const subTitle =
    promotion != null ? removeHtmlTags(promotion.title) : tags.join(', ')

  return (
    <div>
      <Top title={`${corpName} ${name}`} subTitle={subTitle} />
      <ul>
        {benefit.map((text, index) => {
          return (
            <motion.li
              key={text}
              initial={{
                opacity: 0,
                translateX: -90,
              }}
              transition={{
                duration: 0.7,
                ease: 'easeInOut',
                delay: index * 0.1,
              }}
              animate={{
                opacity: 5,
                translateX: 0,
              }}
            >
              <ListRow
                as="div"
                left={<CheckIcon />}
                key={text}
                contents={
                  <ListRow.Texts title={`혜택 ${index + 1}`} subTitle={text} />
                }
              />
            </motion.li>
          )
        })}
      </ul>
      {promotion != null ? (
        <Flex direction="column" css={termContainerStyles}>
          <Text bold={true}>유의사항</Text>
          <Text typography="t7">{removeHtmlTags(promotion.terms)}</Text>
        </Flex>
      ) : null}
      <FixedBottomButton label="신청하기" onClick={() => {}} />
    </div>
  )
}

const termContainerStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px 24px;
`

export default Card
