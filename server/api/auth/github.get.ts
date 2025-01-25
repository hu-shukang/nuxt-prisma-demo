export default defineOAuthGitHubEventHandler({
  async onSuccess(event, result) {
    await setUserSession(event, result);
    return sendRedirect(event, '/');
  },
});
