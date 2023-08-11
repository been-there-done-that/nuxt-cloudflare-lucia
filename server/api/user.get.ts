export default defineEventHandler(async (event) => {
  
  const authRequest = useAuth().handleRequest(event);
  const { user } = await authRequest.validateUser();
  
  console.log({user})
  return { user };
});
