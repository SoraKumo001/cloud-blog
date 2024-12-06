import { useParams } from "react-router";
import { Editor } from "@/components/MarkdownEditor/Editor";

const Page = () => {
  const { id } = useParams();
  if (typeof id !== "string" || typeof window === "undefined") return null;
  return <Editor id={id} />;
};
export default Page;
