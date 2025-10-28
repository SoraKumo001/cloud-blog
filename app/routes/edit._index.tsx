import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useCreateOnePostMutation } from "~/generated/graphql";

const Page = () => {
  const navigate = useNavigate();
  const [, createPost] = useCreateOnePostMutation();
  const property = useRef({ init: false });
  useEffect(() => {
    if (!property.current.init) {
      property.current.init = true;
      createPost({}).then(({ data }) => {
        const id = data?.createOnePost?.id;
        if (id) {
          navigate(`/edit/${id}`, { replace: true });
        }
      });
    }
  }, [createPost, navigate, property]);
};
export default Page;
