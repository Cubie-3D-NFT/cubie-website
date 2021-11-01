import { Center, CircularProgress, Heading } from '@chakra-ui/react';

export default function TextLoader({ text = 'Loading...', circleSize = '25px', ...props }) {
  return (
    <Center {...props}>
      <Heading size="md" fontWeight="normal" mr="2">
        {text}
      </Heading>
      <CircularProgress size={circleSize} color="brand.500" isIndeterminate />
    </Center>
  );
}
