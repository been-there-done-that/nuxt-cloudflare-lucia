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
  console.log({code})
    const { existingUser, githubUser, createUser } =
      await githubAuth().validateCallback(code);
  
    console.log({existingUser, githubUser, createUser})
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

    console.log({ user });
    const session = await useAuth().createSession(
       user.userId,
    );
    
    authRequest.setSession(session);
    return null;
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
