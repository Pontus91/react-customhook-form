import React from 'react';
import { FlexWrapper } from './StyledWrapper';

const Wrapper = (props) => {
  return (
    <FlexWrapper
      alignment={props.alignment}
      content={props.content}
      direction={props.direction}
      width={props.width}
      mediaDirection={props.mediaDirection}
    >
      {props.children}
    </FlexWrapper>
  );
};

export default Wrapper;
