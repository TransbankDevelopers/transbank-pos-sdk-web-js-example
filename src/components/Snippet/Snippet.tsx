import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export type SnippetProps = {
  code: string;
};

const Snippet = (props: SnippetProps) => {
  return (
    <SyntaxHighlighter
      customStyle={{
        height: "100%",
        margin: "0",
        wordWrap: "break-word",
        whiteSpace: "pre-wrap",
        width: "100%",
        overflowY: "auto",
      }}
      style={oneDark}
      language={"JSON"}
      wrapLongLines={true}
      wrapLines={true}
    >
      {props.code}
    </SyntaxHighlighter>
  );
};

export default Snippet;
