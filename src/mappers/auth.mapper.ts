import { User } from '@/entities/user.entity';

export const toUser = ({ email, firstName, lastName, avatarUrl }: User) => ({
  email,
  firstName,
  lastName,
  avatarUrl,
});
