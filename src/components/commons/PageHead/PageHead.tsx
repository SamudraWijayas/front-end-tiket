import Head from "next/head";

interface PropTypes {
  title?: string;
}
const PageHead = (props: PropTypes) => {
  const { title = "Default Title" } = props;
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="UTF-8" />
      <meta name="description" content="A simple description for the page." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};


export default PageHead;