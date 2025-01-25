export default defineOAuthCognitoEventHandler({
  async onSuccess(event, result) {
    await setUserSession(event, result);
    return sendRedirect(event, '/');
  },
});
