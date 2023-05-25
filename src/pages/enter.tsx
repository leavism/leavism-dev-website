import { useEffect } from 'react';
import Router from 'next/router';
import { useUserRole } from '~/utils/hooks';
import AdminAuth from 'components/Admin/AdminAuth';
import Container from 'components/Container';

const Enter = () => {
  const { admin } = useUserRole();

  useEffect(() => {
    if (admin) {
      void Router.push('/admin');
    }
  }, [admin]);

  return (
    <Container>
      <AdminAuth />
    </Container>
  );
};

export default Enter;
