import React from 'react'
import Flex from './Flex'
import Text from './Text'
import RightArrow from '@assets/icons/right_chevron_icon.svg?react'
import { css } from '@emotion/react'

interface ListRowProps {
  left?: React.ReactNode
  contents: React.ReactNode
  right?: React.ReactNode
  withArrow?: boolean
  onClick?: () => void
  as?: 'div' | 'li'
}

function ListRowTexts({
  title,
  subTitle,
}: {
  title: string
  subTitle: string
}) {
  return (
    <Flex direction="column">
      <Text bold={true}>{title}</Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  )
}

function ListRow({
  left,
  contents,
  right,
  withArrow,
  onClick,
  as = 'li',
}: ListRowProps) {
  return (
    <Flex as={as} css={listRowContainerStyles} align="center" onClick={onClick}>
      <Flex css={listRowLeftStyles}>{left}</Flex>
      <Flex css={listRowContentsStyles}>{contents}</Flex>
      <Flex>{right}</Flex>
      {withArrow ? (
        <RightArrow css={rightArrowStyles} onClick={onClick} />
      ) : null}
    </Flex>
  )
}

const listRowContainerStyles = css`
  padding: 8px 24px;
`
const rightArrowStyles = css`
  width: 15px;
  height: 15px;
  cursor: pointer;
`
const listRowLeftStyles = css`
  margin-right: 14px;
`
const listRowContentsStyles = css`
  flex: 1;
`
ListRow.Texts = ListRowTexts

export default ListRow
