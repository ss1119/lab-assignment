export default (context) => {
  if (!context.store.getters.isLoggined) {
    context.redirect('/')
  }
}
