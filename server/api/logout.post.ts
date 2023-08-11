export default defineEventHandler(async (event) => {
  const authRequest = useAuth().handleRequest(event);
  // check if user is authenticated
  const session = await authRequest.validate();
  if (!session) {
    throw createError({
      message: "Not authenticated",
      statusCode: 401,
    });
  }
  // make sure to invalidate the current session!
  await useAuth().invalidateSession(session.sessionId);
  // delete session cookie
  authRequest.setSession(null);
  return sendRedirect(event, "/login");
});
