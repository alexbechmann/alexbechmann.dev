import React from "react";
import { makeStyles } from "@material-ui/core";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";

export interface SnippetsProps {
  source: any;
}

function Heading(props) {
  return <h1 {...props} />;
}

const components = { Heading };

const useStyles = makeStyles((theme) => ({}));

function Snippets(props: SnippetsProps) {
  const classes = useStyles(props);
  const { source } = props;
  const content = hydrate(source, { components });
  return <Layout>{content}</Layout>;
}
export const getStaticProps: GetStaticProps = async () => {
  const source = `Some **mdx** text, with a component <Heading />

  ## Lerna
  \`\`\`json
{
    "packages": ["apps/*"],
    "version": "0.0.0",
    "npmClient": "yarn",
    "useWorkspaces": true
}
  \`\`\`
  
  `;
  const mdxSource = await renderToString(source, { components });
  return { props: { source: mdxSource } };
};

export default Snippets;
