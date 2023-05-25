import { useRouter } from 'next/router';
import Link from 'next/link';
import { api } from '~/utils/api';
import isAdmin from '~/utils/isAdmin';
import BlogEditButton from 'components/Admin/BlogAdminButton';
import AdminAuth from 'components/Admin/AdminAuth';
import Container from 'components/Container';

export const getServerSideProps = isAdmin(() => {
  return { props: {} };
});

const AdminPage = () => {
  const { data: allBlogs } = api.blog.listBlog.useQuery();
  const blogMutation = api.blog.deleteBlog.useMutation();
  const router = useRouter();

  const handleDelete = (slug: string) => {
    blogMutation.mutate({ slug });
    router.reload();
  };

  return (
    <Container>
      <div className="flex flex-col gap-10">
        <AdminAuth />
        <Link
          href="/admin/newpost"
          className="flex h-fit w-full justify-center rounded-md border border-solid px-4 py-2 text-2xl font-bold transition-all duration-150 ease-out hover:-translate-x-1 hover:border-gray-700 hover:shadow-[3px_3px_0px] focus-visible:outline-offset-1 dark:border dark:hover:border-white"
        >
          New Post
        </Link>
        <div className="mt-8">
          {allBlogs?.length ? (
            allBlogs.map((blog) => (
              <article key={blog.slug} className="mb-10">
                {blog.slug ? (
                  <Link href={`/blog/${blog.slug}`} className="font-bold">
                    <h1 className="!my-0">{blog.title}</h1>
                  </Link>
                ) : null}
                <p className="!my-1">{blog.description}</p>
                <div className="flex flex-row gap-5">
                  {blog.slug ? (
                    <>
                      <BlogEditButton path={`/admin/edit/${blog.slug}`}>
                        Edit
                      </BlogEditButton>
                      <button
                        onClick={() => handleDelete(blog.slug)}
                        className="flex h-fit justify-center rounded-md border border-solid px-4 py-1 transition-all duration-150 ease-out hover:-translate-x-1 hover:border-gray-700 hover:shadow-[3px_3px_0px] focus-visible:outline-offset-1 dark:border dark:hover:border-white"
                      >
                        Delete
                      </button>
                    </>
                  ) : null}
                </div>
              </article>
            ))
          ) : (
            <p>No blog posted yet 😐</p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default AdminPage;
