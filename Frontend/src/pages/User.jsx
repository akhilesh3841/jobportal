import React from 'react';
import { useSelector } from 'react-redux';
import Editprofile from '../components/Editprofile';

const User = () => {
  const admin = useSelector((store) => store.user.user);

  if (!admin) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <Editprofile
        name={admin.name}
        email={admin.email}
        address={admin.address}
        phone={admin.phone}
        role={admin.role}
        resume={admin.resume?.url || ""}
      />
    </div>
  );
};

export default User;
