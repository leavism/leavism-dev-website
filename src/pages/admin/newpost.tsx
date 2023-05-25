import Container from 'components/Container';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useReducer, type FormEvent } from 'react';
import { api } from '~/utils/api';

export default function NewPost() {
  const descriptionReducer = (
    state: { description?: string },
    event: { target: { name: string; value: string } }
  ) => {
    return {
      ...state,
      [event.target.name]: event.target.value,
    };
  };

  const contentReducer = (
    state: { content?: string },
    event: { target: { name: string; value: string } }
  ) => {
    return {
      ...state,
      [event.target.name]: event.target.value,
    };
  };

  const titleReducer = (
    state: { title?: string },
    event: { target: { name: string; value: string } }
  ) => {
    return {
      ...state,
      [event.target.name]: event.target.value,
    };
  };

  const [descriptionData, setDescriptionData] = useReducer(
    descriptionReducer,
    {}
  );
  const [contentData, setContentData] = useReducer(contentReducer, {});
  const [titleData, setTitleData] = useReducer(titleReducer, {});

  const router = useRouter();
  const { data: sessionData } = useSession();

  const postBlog = api.blog.postBlog.useMutation();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!titleData.title) return;
    if (!contentData.content) return;
    if (!descriptionData.description) return;
    if (!sessionData?.user.id) return;

    const newBlogPost = {
      title: titleData.title,
      slug: titleData.title?.replaceAll(' ', '-').toLowerCase(),
      authorId: sessionData?.user.id,
      content: contentData.content,
      description: descriptionData.description,
    };

    postBlog.mutate(newBlogPost);
    await router.push(
      `/blog/${titleData.title?.replaceAll(' ', '-').toLowerCase() ?? ''}`
    );
  };

  return (
    <Container>
      <div>
        <form
          className="flex flex-col"
          onSubmit={(event) => void handleSubmit(event)}
        >
          <label>Title</label>
          <input
            className="m-3 w-full rounded-lg border-2 border-solid border-neutral-200 p-3 outline-none focus:border-2 focus:border-neutral-400 dark:bg-neutral-600"
            onChange={setTitleData}
            name="title"
            type="text"
            required
            minLength={1}
          ></input>
          <label>Description</label>
          <textarea
            className="m-3 w-full rounded-lg border-2 border-solid border-neutral-200 p-3 outline-none focus:border-2 focus:border-neutral-400 dark:bg-neutral-600"
            rows={2}
            onChange={setDescriptionData}
            name="description"
            required
            minLength={1}
          ></textarea>
          <label>Content</label>
          <textarea
            className="m-3 w-full rounded-lg border-2 border-solid border-neutral-200 p-3 outline-none focus:border-2 focus:border-neutral-400 dark:bg-neutral-600"
            rows={20}
            onChange={setContentData}
            name="content"
            required
            minLength={1}
          ></textarea>
          <input
            className="flex h-fit w-fit justify-center self-end rounded-md border border-solid px-4 py-1 transition-all duration-150 ease-out hover:-translate-x-1 hover:border-gray-700 hover:shadow-[3px_3px_0px] focus-visible:outline-offset-1 dark:border dark:hover:border-white"
            type="submit"
          ></input>
        </form>
      </div>
    </Container>
  );
}
