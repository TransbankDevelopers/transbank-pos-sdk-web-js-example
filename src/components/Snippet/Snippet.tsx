import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export type SnippetProps = {
  code: string;
};

const Snippet = (props: SnippetProps) => {
  return (
    <SyntaxHighlighter
      customStyle={{ height: "100%", margin: "0" }}
      style={oneDark}
      language={"JSON"}
    >
      {props.code}
    </SyntaxHighlighter>
  );
};

export default Snippet;
