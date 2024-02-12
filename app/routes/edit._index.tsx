import { useNavigate } from "@remix-run/react";
import { useEffectOnce } from "react-use";
import { useCreateOnePostMutation } from "@/generated/graphql";

const Page = () => {
  const navigate = useNavigate();
  const [, createPost] = useCreateOnePostMutation();
  useEffectOnce(() => {
    createPost({}).then(({ data }) => {
      const id = data?.createOnePost?.id;
      id && navigate(`/edit/${id}`, { replace: true });
    });
  });
};
export default Page;
