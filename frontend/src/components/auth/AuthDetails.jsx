import { onAuthStateChanged, signOut } from '@firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setAuthUser(authUser)
      } else {
        setAuthUser(null)
      }
    });

    return () => listen();
  }, []);

  const userSignOut = () => {
    signOut(auth).then(() => {
      console.log('Signed Out');
      setAuthUser(null);
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div>
      <h1>{authUser ?
        <>
          <p>{`Signed In as ${authUser.email}`}</p>
          <button
            onClick={userSignOut}>
            Sign Out
          </button>
        </>
        : <p>Signed Out</p>}</h1>
    </div>
  );
}

export default AuthDetails;