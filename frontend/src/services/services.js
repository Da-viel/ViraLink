export const getProfileService = async ({ token }) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND}/users`, {
      headers: {
        Authorization: token,
      },
    });

    const body = await res.json();

    if (body.status === 'ok') {
      return body;
    }
  } catch (err) {
    console.error(err);
  }
};
