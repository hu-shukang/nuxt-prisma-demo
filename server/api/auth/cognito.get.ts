export default defineOAuthCognitoEventHandler({
  async onSuccess(event, result) {
    console.log('Cognito login success', result);
    await setUserSession(event, result);
    return sendRedirect(event, '/');
  },
});
