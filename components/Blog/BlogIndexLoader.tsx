import ContentLoader from 'react-content-loader';
import Container from 'components/Container';

export const LightBlogIndexLoader = () => (
  <Container>
    <ContentLoader viewBox="0 0 500 500" title={'Loading blog posts'}>
      <rect x="0" y="0" rx="4" ry="4" width="50%" height="50" />
      <rect x="0" y="75" rx="4" ry="4" width="100%" height="25" />
      <rect x="0" y="110" rx="4" ry="4" width="13%" height="25" />
      <rect x="0" y="150" rx="4" ry="4" width="20%" height="25" />
      <rect x="0" y="180" rx="4" ry="4" width="20%" height="15" />
    </ContentLoader>
  </Container>
);

export const DarkBlogIndexLoader = () => (
  <Container>
    <ContentLoader
      viewBox="0 0 500 500"
      title={'Loading blog posts'}
      backgroundColor="#404040"
      foregroundColor="#525252"
    >
      <rect x="0" y="0" rx="4" ry="4" width="50%" height="50" />
      <rect x="0" y="75" rx="4" ry="4" width="100%" height="25" />
      <rect x="0" y="110" rx="4" ry="4" width="13%" height="25" />
      <rect x="0" y="150" rx="4" ry="4" width="20%" height="25" />
      <rect x="0" y="180" rx="4" ry="4" width="20%" height="15" />
    </ContentLoader>
  </Container>
);
