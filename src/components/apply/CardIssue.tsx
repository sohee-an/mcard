/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { colors } from 'src/styles/colorPalette';

// 슬라이드 업 애니메이션 정의
const slideUpToCenter = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

// 부모 요소 스타일
const containerStyle = css`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 메시지 스타일 정의
const messageStyle = (state: string) => css`
  position: absolute;
  top: 30%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
  font-size: 1.5em;
  color: ${state === 'true' ? colors.blue : colors.red};
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  animation: ${slideUpToCenter} 1s ease forwards;
`;

function CardIssuedMessage({ state }: { state: string }) {
  return (
    <div css={containerStyle}>
      <div css={messageStyle(state)}>
        {state === 'true'
          ? '카드가 발급되었습니다!'
          : '카드 선택에 실패하였습니다!'}
      </div>
    </div>
  );
}

export default CardIssuedMessage;
