import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { useCreateOnePostMutation } from "@/generated/graphql";

const Page = () => {
  const navigate = useNavigate();
  const [, createPost] = useCreateOnePostMutation();
  useEffect(() => {
    createPost({}).then(({ data }) => {
      const id = data?.createOnePost?.id;
      id && navigate(`/edit/${id}`, { replace: true });
    });
  }, [createPost, navigate]);
};
export default Page;
