import { OAuthRequestError } from "@lucia-auth/oauth";

export default defineEventHandler(async (event) => {
  const authRequest = useAuth().handleRequest(event);
  const sessions = await authRequest.validate();
  if (sessions) {
    return sendRedirect(event, "/");
  }
  const storedState = getCookie(event, "oauth_state");
  const query = getQuery(event);
  const state = query.state?.toString();
  const code = query.code?.toString();
  // validate state
  // if (!storedState || !state || storedState !== state || !code) {
  //   return sendError(
  //     event,
  //     createError({
  //       statusCode: 400,
  //     })
  //   );
  // }
  // try {
    const { existingUser, githubUser, createUser } =
      await githubAuth().validateCallback(code);

    const getUser = async () => {
      if (existingUser) return existingUser;
      const user = await createUser({
        attributes: {
          username: githubUser.login,
        },
      });
      return user;
    };

    const user = await getUser();

    console.log({ githubUser });
    const session = await useAuth().createSession(
       user.userId,
    );
    authRequest.setSession(session);
    return sendRedirect(event, "/");
  // } catch (e) {
  //   if (e instanceof OAuthRequestError) {
  //     // invalid code
  //     return sendError(
  //       event,
  //       createError({
  //         statusCode: 400,
  //       })
  //     );
  //   }
  //   return sendError(
  //     event,
  //     createError({
  //       statusCode: 500,
  //     })
  //   );
  // }
});
