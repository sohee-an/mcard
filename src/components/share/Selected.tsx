import React, { forwardRef, SelectHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { colors } from 'src/styles/colorPalette';
import Flex from './Flex';
import Text from './Text';
import { Option } from '@models/apply';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  placeholder?: string;
}

const BaseSelect = styled.select`
  height: 52px;
  background-color: ${colors.grey};
  border: none;
  border-radius: 12px;
  padding: 0 16px;
  cursor: pointer;

  &:required:invalid {
    color: ${colors.grey1};
  }
`;

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, placeholder, value, ...props },
  ref
) {
  return (
    <Flex direction="column">
      {label ? (
        <Text typography="t7" color="black">
          {label}
        </Text>
      ) : null}
      <BaseSelect required={true} value={value} ref={ref} {...props}>
        <option disabled={true} hidden={true} value="">
          {placeholder}
        </option>
        {options.map(({ label, value }) => {
          return (
            <option key={label} value={value}>
              {label}
            </option>
          );
        })}
      </BaseSelect>
    </Flex>
  );
});

export default Select;
