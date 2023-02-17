import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import { Words } from "~/components";

const HomePage: NextPage = () => (
  <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
      />
      <title>Words app</title>
    </Head>

    <Words />
  </>
);

export default HomePage;
