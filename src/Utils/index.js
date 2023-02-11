export const checkUserIsAdmin = currentUser => {
    if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;
    const {userRoles} = currentUser;
    if (userRoles.includes('admin')) return true;
    return false;
}


export const checkUserIsSeller = currentUser => {
    if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;
    const {userRoles} = currentUser;
    if (userRoles.includes('seller')) return true;
    return false;
}
