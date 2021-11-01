import styled from 'styled-components';

const InfoCard = styled.button`
  background-color: ${({ active }) => (active ? 'rgb(206, 208, 217)' : 'rgb(237, 238, 242)')};
  padding: 1rem;
  outline: none;
  border: 1px solid;
  border-radius: 12px;
  width: 100% !important;
  &:focus {
    box-shadow: 0 0 0 1px var(--chakra-colors-brand-500);
  }
  border-color: ${({ active }) => (active ? 'transparent' : 'rgb(206, 208, 217)')};
`;

const OptionCard = styled(InfoCard)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  padding: 1rem;
`;

const OptionCardLeft = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  height: 100%;
`;

const OptionCardClickable = styled(OptionCard)`
  margin-top: 0;
  &:hover {
    cursor: ${({ clickable }) => (clickable ? 'pointer' : '')};
    border: ${({ clickable }) => (clickable ? `1px solid var(--chakra-colors-brand-500)` : ``)};
  }
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
`;

const GreenCircle = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  &:first-child {
    height: 8px;
    width: 8px;
    margin-right: 8px;
    background-color: #27ae60;
    border-radius: 50%;
  }
`;

const CircleWrapper = styled.div`
  color: #27ae60;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderText = styled.div`
  display: flex;
  flex-flow: row nowrap;
  color: ${(props) => (props.color === 'blue' ? 'var(--chakra-colors-brand-500)' : 'rgb(0, 0, 0)')};
  font-size: 1rem;
  font-weight: 500;
`;

const SubHeader = styled.div`
  color: black;
  margin-top: 10px;
  font-size: 12px;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '24px')};
    width: ${({ size }) => (size ? size + 'px' : '24px')};
  }
`;

export default function Option({ link = null, clickable = true, size, onClick = null, color, header, subheader = null, icon, active = false, id }) {
  const content = (
    <OptionCardClickable id={id} onClick={onClick} clickable={clickable && !active} active={active}>
      <OptionCardLeft>
        <HeaderText color={color}>
          {active ? (
            <CircleWrapper>
              <GreenCircle>
                <div />
              </GreenCircle>
            </CircleWrapper>
          ) : (
            ''
          )}
          {header}
        </HeaderText>
        {subheader && <SubHeader>{subheader}</SubHeader>}
      </OptionCardLeft>
      <IconWrapper size={size}>
        <img src={icon} alt="Icon" />
      </IconWrapper>
    </OptionCardClickable>
  );
  if (link) {
    return (
      <a href={link} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
