const getRecipientEmail = (users, userLoggedIn) => {
  if (!Array.isArray(users)) {

    return [];
  }

  return users.filter((userToFilter) => userToFilter !== userLoggedIn?.email)[0];
};

export default getRecipientEmail;
