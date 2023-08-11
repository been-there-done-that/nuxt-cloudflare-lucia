import { OAuthRequestError } from "@lucia-auth/oauth";

export default defineEventHandler(async (event) => {
  // const authRequest = useAuth().handleRequest(event);
  // const sessions = await authRequest.validate();
  // if (sessions) {
  //   return sendRedirect(event, "/");
  // }
  //
  //
  
  const storedState = getCookie(event, "auth_session");
  const query = getQuery(event);
  const state = query.state?.toString();
  const code = query.code?.toString();
  const auth = useAuth()
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
      await githubAuth(auth).validateCallback(code);
  
    const getUser = async () => {
      if (existingUser) return existingUser;
      const user = await createUser(
          {
            primaryKey: {
              providerId: "github",
              providerUserId: githubUser.id,
            },
            attributes: {
              username: githubUser.login,
              email: `${githubUser.id}@fummy.com`,
            },
          })
      return user;
    };

    const user = await getUser();
  const authRequest = useAuth().handleRequest(event);
  const session = await useAuth().createSession(user.userId);
  authRequest.setSession(session);
  const us = await authRequest.validateUser()
  return sendRedirect(event, '/');
  
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
