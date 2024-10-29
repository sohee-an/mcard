import { colors } from 'src/styles/colorPalette'
import Dimmed from './Dimmed'
import styled from '@emotion/styled'
import Text from './Text'
import Flex from './Flex'
import Button from './Button'

interface AlertProps {
  open?: boolean
  title: React.ReactNode
  description?: React.ReactNode
  buttonLabel?: string
  onButtonClick: () => void
}

function Alert({
  open,
  title,
  description,
  buttonLabel,
  onButtonClick,
}: AlertProps) {
  if (open === false) {
    return null
  }
  return (
    <Dimmed>
      <AlertContainer>
        <Text
          typography="t4"
          bold={true}
          display="block"
          style={{ marginBottom: 6 }}
        >
          {title}
        </Text>
        {description ? <Text typography="t7">{description}</Text> : null}
        {buttonLabel && (
          <Flex justify="justify-end">
            <Button
              onClick={onButtonClick}
              weak={true}
              style={{ marginTop: 12, border: 'none' }}
            >
              {buttonLabel}
            </Button>
          </Flex>
        )}
      </AlertContainer>
    </Dimmed>
  )
}

const AlertContainer = styled.div`
  background-color: ${colors.white};
  border-radius: 8px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  z-index: var(--alert-zindex);
`

export default Alert
