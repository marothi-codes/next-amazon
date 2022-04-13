import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../utils/Store';

function Shipping() {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const { userInfo } = state;

  if (!userInfo) router.push('/login?redirect=/shipping');

  return <div>Shipping Page</div>;
}

export default Shipping;
