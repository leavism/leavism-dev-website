/* eslint-disable react/no-unescaped-entities */
import { type NextPage } from "next";

import Container from "components/Container";

const Home: NextPage = () => {
  return (
    <>
      <Container>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">
            Hey! My name is <strong>Huy Dang</strong>.
          </h1>
          <p>
            I'm an undergraduate student at SFSU and I'm trying to learn web dev with the T3 stack!
          </p>
        </div>
      </Container>
    </>
  );
};

export default Home;