import Container from 'components/Container';
import { useSession } from 'next-auth/react';
import Router, { useRouter } from 'next/router';
import { useReducer, type FormEvent, useEffect } from 'react';
import { api } from '~/utils/api';
import { useUserRole } from '~/utils/hooks';

export default function BlogEdit() {
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

  const blogQuery = api.blog.getBlogBySlug;
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { admin } = useUserRole();
  const { data: blog } = blogQuery.useQuery({
    slug: router.query.slug as string,
  });
  const editBlogQuery = api.blog.editBlog.useMutation();

  useEffect(() => {
    if (!admin) {
      void Router.push('/enter');
    }
  }, [admin]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (!blog) return;
    event.preventDefault();
    console.log(titleData);
    const updatedBlogPost = {
      title: titleData.title ?? blog.title,
      oldSlug: router.query.slug as string,
      newSlug: titleData.title?.replaceAll(' ', '-').toLowerCase() ?? blog.slug,
      authorId: sessionData?.user.id ?? blog.authorId,
      content: contentData.content ?? blog.content,
      description: descriptionData.description ?? blog.description,
    };
    editBlogQuery.mutate(updatedBlogPost);
    await router.push(`/blog/${titleData.title?.replaceAll(' ', '-') ?? ''}`);
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
            defaultValue={blog?.title}
            name="title"
            type="text"
          ></input>
          <label>Description</label>
          <textarea
            className="m-3 w-full rounded-lg border-2 border-solid border-neutral-200 p-3 outline-none focus:border-2 focus:border-neutral-400 dark:bg-neutral-600"
            rows={2}
            onChange={setDescriptionData}
            name="description"
            defaultValue={blog?.description}
          ></textarea>
          <label>Content</label>
          <textarea
            className="m-3 w-full rounded-lg border-2 border-solid border-neutral-200 p-3 outline-none focus:border-2 focus:border-neutral-400 dark:bg-neutral-600"
            rows={20}
            onChange={setContentData}
            name="content"
            defaultValue={blog?.content}
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
