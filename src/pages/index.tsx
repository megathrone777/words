import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import { Words } from "~/components";

const HomePage: NextPage = () => (
  <>
    <Head>
      <title>Words app</title>
    </Head>

    <Words />
  </>
);

export default HomePage;
