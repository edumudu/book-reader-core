export const errors = {
  syntax(action: string): { error: string } {
    return { error: `Invalid syntaxy to ${action} user.` };
  },
  permition: { error: 'Operation not permitted.' },
  notFound: { error: 'User not found' },
};

export const authorized_level = ['admin', 'mod'];
