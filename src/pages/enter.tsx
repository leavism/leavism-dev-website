import AdminAuth from 'components/Admin/AdminAuth';
import Container from 'components/Container';
import Router from 'next/router';
import { useEffect } from 'react';
import { useUserRole } from '~/utils/hooks';

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
