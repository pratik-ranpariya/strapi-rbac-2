import { Flex } from '@strapi/design-system';
import { Loader } from '@strapi/design-system';

const LoaderComponent = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      style={{ height: '80vh' }} // Center vertically
    >
      <Loader style={{ width: 42, height: 42 }} />
    </Flex>
  );
};

export default LoaderComponent;
