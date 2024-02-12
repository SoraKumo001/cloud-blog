import { useParams } from "@remix-run/react";
import { Categories } from "@/components/Pages/Categories";

const Page = () => {
  const { id } = useParams();
  if (typeof id !== "string") return null;
  return <Categories id={id} />;
};
export default Page;
export const runtime = "experimental-edge";
