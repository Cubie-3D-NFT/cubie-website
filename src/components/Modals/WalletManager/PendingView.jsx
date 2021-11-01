import { darken } from 'polished';
import CircleLoader from 'src/components/Loaders/CircleLoader';
import { injected } from 'src/connectors';
import { SUPPORTED_WALLETS } from 'src/constants';
import styled from 'styled-components';

import Option from './Option';

const PendingSection = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  & > * {
    width: 100%;
  }
`;
const StyledLoader = styled(CircleLoader)`
  margin-right: 1rem;
`;

const LoadingMessage = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  border-radius: 12px;
  margin-bottom: 20px;
  color: ${({ error }) => (error ? '#FF6871' : 'var(--chakra-colors-brand-500)')};
  border: 1px solid ${({ error }) => (error ? '#FF6871' : '#C3C5CB')};

  & > * {
    padding: 1rem;
  }
`;

const ErrorGroup = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
`;

const ErrorButton = styled.div`
  border-radius: 8px;
  font-size: 12px;
  color: black;
  background-color: #ced0d9;
  margin-left: 1rem;
  padding: 0.5rem;
  font-weight: 600;
  user-select: none;

  &:hover {
    cursor: pointer;
    background-color: ${darken(0.1, '#C3C5CB')};
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
`;

export default function PendingView({ connector, error = false, setPendingError, tryActivation }) {
  const isMetamask = window?.ethereum?.isMetaMask;

  return (
    <PendingSection>
      <LoadingMessage error={error}>
        <LoadingWrapper>
          {error ? (
            <ErrorGroup>
              <div>Error connecting.</div>
              <ErrorButton
                onClick={() => {
                  setPendingError(false);
                  connector && tryActivation(connector);
                }}
              >
                Try Again
              </ErrorButton>
            </ErrorGroup>
          ) : (
            <>
              <StyledLoader />
              Initializing...
            </>
          )}
        </LoadingWrapper>
      </LoadingMessage>
      {Object.keys(SUPPORTED_WALLETS).map((key) => {
        const option = SUPPORTED_WALLETS[key];
        if (option.connector === connector) {
          if (option.connector === injected) {
            if (isMetamask && option.name !== 'MetaMask') {
              return null;
            }
            if (!isMetamask && option.name === 'MetaMask') {
              return null;
            }
          }
          return (
            <Option
              id={`connect-${key}`}
              key={key}
              clickable={false}
              color={option.color}
              header={option.name}
              subheader={option.description}
              icon={require('src/assets/images/providers/' + option.iconName)}
            />
          );
        }
        return null;
      })}
    </PendingSection>
  );
}
