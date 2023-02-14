import { AppProps } from "next/app";

import "./style.css";

const App = ({ Component, pageProps }: AppProps) => (
  <div className="wrapper">
    <Component {...pageProps} />
  </div>
);

export default App;
