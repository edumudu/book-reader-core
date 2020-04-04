module.exports = {
  errors: {
    syntax(action) { return { error: `Invalid syntaxy to ${action} user.` }},
    permition: { error: 'Operation not permitted.' },
    notFound: { error: 'User not found' }
  },

  authorized_level: ['admin', 'mod']
}
