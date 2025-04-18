import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useCreateOnePostMutation } from "@/generated/graphql";

const Page = () => {
  const navigate = useNavigate();
  const [, createPost] = useCreateOnePostMutation();
  useEffect(() => {
    createPost({}).then(({ data }) => {
      const id = data?.createOnePost?.id;
      if (id) {
        navigate(`/edit/${id}`, { replace: true });
      }
    });
  }, [createPost, navigate]);
};
export default Page;
