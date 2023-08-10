export default defineEventHandler(async (event) => {
  const authRequest = useAuth().handleRequest(event);
  const session = await authRequest.validate();
  if (session) {
    return sendRedirect(event, "/");
  }
  const [url, state] = await githubAuth().getAuthorizationUrl();
  setCookie(event, "oauth_state", state, {
    httpOnly: true,
    secure: !process.dev,
    path: "/",
    maxAge: 60 * 60,
  });
  return sendRedirect(event, url.toString());
});
