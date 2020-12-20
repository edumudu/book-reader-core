import User from '../models/user';

export interface UserView {
  id: User['id'];
  email: User['email'];
  username: User['username'];
  role: User['role'];
  createdAt: User['createdAt'];
  updatedAt: User['updatedAt'];
}

interface ExportType {
  render<P = User | User[]>(user: P): P extends User ? UserView : UserView[];
}

export default {
  render(users: User | User[]) {
    const format = (user: User): UserView => ({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });

    return Array.isArray(users) ? users.map(format) : format(users);
  },
} as ExportType;
