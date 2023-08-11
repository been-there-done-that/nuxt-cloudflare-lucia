import { useValidatedBody, z } from "h3-zod";
import { LuciaError } from "lucia-auth";

export default defineEventHandler(async (event) => {
  // const { email, password } = await useValidatedBody(event, {
  //   email: z.string().email(),
  //   password: z.string().min(8).max(128),
  // });

  
  try {
    const authRequest = useAuth().handleRequest(event);
    const key = await useAuth().useKey("email", `email-${Math.floor(Math.random())}\@admin.com`, 'somerandompassword');
    const session = await useAuth().createSession(key.userId);
    authRequest.setSession(session);
    const us = await authRequest.validateUser()
    console.log({us})
    return null;
  } catch (error) {
    if (
      error instanceof LuciaError &&
      (error.message === "AUTH_INVALID_KEY_ID" ||
        error.message === "AUTH_INVALID_PASSWORD")
    ) {
      return {
        error: "Incorrect username or password",
      };
    }
    // database connection error
    console.log(error);
    return {
      error,
    };
  }
});
