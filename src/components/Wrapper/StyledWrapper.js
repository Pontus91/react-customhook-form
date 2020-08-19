import styled from 'styled-components';

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.content};
  align-items: ${(props) => props.alignment};
  width: ${(props) => props.width};
  @media (max-width: 1024) {
    flex-direction: ${(props) => props.mediaDirection};
  }
  @media (max-width: 768px) {
    flex-direction: ${(props) => props.mediaDirection};
  }
  @media (max-width: 576px) {
    flex-direction: ${(props) => props.mediaDirection};
  }
`;
