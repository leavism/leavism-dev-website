/* eslint-disable react/no-unescaped-entities */
import { type NextPage } from 'next';
import Container from 'components/Container';

const Home: NextPage = () => {
  return (
    <>
      <Container>
        <div className="space-y-6">
          <h1 className="font-bold">
            Hey! My name is <strong>Huy Dang</strong>.
          </h1>
          <p>
            I'm an undergraduate student at SFSU trying to learn web
            development.
          </p>
        </div>
      </Container>
    </>
  );
};

export default Home;
