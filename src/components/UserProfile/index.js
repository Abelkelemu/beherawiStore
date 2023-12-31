import React from 'react';
import './styles.scss';

// image 

import userIMG from './../../assets/user.png';

const UserProfile = props => {

  const { currentUser } = props;
  const { displayName } = currentUser;
  const { userRoles } = currentUser;

  return (
    <div className="userProfile">

      <ul>

        <li>
          <div className="img">
            <img src={userIMG} />
          </div>
        </li>

        <li>
          <span className="displayName">
            {displayName && displayName}
          </span>
        </li>

        <li>
          <span className="displayName">
            {userRoles[1] && userRoles[1]}
          </span>
        </li>
        
      </ul>
    </div>
  );
}

export default UserProfile;