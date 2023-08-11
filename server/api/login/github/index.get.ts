import {getCookie} from "h3";

export default defineEventHandler(async (event) => {
  const auth = useAuth()
  const authRequest = auth.handleRequest(event);
  const session = await authRequest.validate();
  if (session) {
    return sendRedirect(event, "/");
  }
  const [url, state] = await githubAuth(auth).getAuthorizationUrl();
  setCookie(event, "auth_session", state, {
    httpOnly: true,
    secure: !process.dev,
    path: "/",
    maxAge: 60 * 60,
  });
  const abc = getCookie(event, 'auth_session')
  console.log({abc})
  return sendRedirect(event, url.toString());
});
