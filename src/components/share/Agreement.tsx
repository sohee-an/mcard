import { MouseEvent } from 'react';
import React from 'react';
import Flex from './Flex';
import Text from './Text';
import { css } from '@emotion/react';
import IconCheck from '@assets/icons/term_check.svg?react';
import { colors } from 'src/styles/colorPalette';
import DesCheckIcon from '@assets/icons/checked_nolayout.svg?react';

function Agreement({ children }: { children: React.ReactNode }) {
  return (
    <Flex as="ul" direction="column" css={agreementContainerStyles}>
      {children}
    </Flex>
  );
}

function AgreementTitle({
  children,
  checked,
  onChange,
}: {
  children: React.ReactNode;
  checked: boolean;
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void;
}) {
  return (
    <Flex as="li" onClick={(e) => onChange(e, !checked)} align="center" gap={4}>
      <IconCheck fill={checked ? `${colors.blue}` : `${colors.grey}`} />
      <Text bold={true}>{children}</Text>
    </Flex>
  );
}
function AgreementDescription({
  children,
  checked,
  onChange,
  link,
}: {
  link?: string;
  children: React.ReactNode;
  checked: boolean;
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void;
}) {
  return (
    <Flex as="li" justify="space-between" css={agreementDesContainerStyles}>
      <Flex
        align="center"
        gap={4}
        onClick={(e) => {
          onChange(e, !checked);
        }}
      >
        <DesCheckIcon stroke={checked ? `${colors.blue}` : `${colors.grey}`} />
        <Text typography="t6">{children}</Text>
      </Flex>
      {link != null ? (
        <a href={link} target="blank" rel="noreferrer">
          <button css={linkButtonStyles}>링크</button>
        </a>
      ) : null}
    </Flex>
  );
}

Agreement.Title = AgreementTitle;
Agreement.Description = AgreementDescription;

const agreementContainerStyles = css`
  padding: 24px;
  & li {
    cursor: pointer;
  }
`;
const linkButtonStyles = css`
  border: 1px solid ${colors.grey};
  padding: 3px;
  box-sizing: border-box;
  font-size: 13px;
  border-radius: 5px;
`;
const agreementDesContainerStyles = css`
  margin-top: 10px;
`;

export default Agreement;
