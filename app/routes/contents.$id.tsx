import { useParams } from "react-router";
import { Contents } from "@/components/Contents";

const Page = () => {
  const { id } = useParams();

  if (typeof id !== "string") return null;
  return <Contents id={id} />;
};
export default Page;
