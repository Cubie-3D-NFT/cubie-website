import { CheckCircle, Copy } from 'react-feather';
import useCopyClipboard from 'src/hooks/useCopyClipboard';
import styled from 'styled-components';

const CopyIcon = styled.span`
  color: #888d9b;
  flex-shrink: 0;
  display: flex;
  text-decoration: none;
  font-size: 0.825rem;
  :hover,
  :active,
  :focus {
    text-decoration: none;
    color: #565a69;
  }
`;
const TransactionStatusText = styled.span`
  margin-left: 0.25rem;
  font-size: 0.825rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

export default function CopyHelper(props) {
  const [isCopied, setCopied] = useCopyClipboard();
  const { children } = props;
  return (
    <CopyIcon onClick={() => setCopied(props.toCopy)}>
      {isCopied ? (
        <TransactionStatusText>
          <CheckCircle size="16" />
          <TransactionStatusText>Copied</TransactionStatusText>
        </TransactionStatusText>
      ) : (
        <TransactionStatusText>
          <Copy size="16" />
        </TransactionStatusText>
      )}
      {isCopied ? '' : children}
    </CopyIcon>
  );
}
