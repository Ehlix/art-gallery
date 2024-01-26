import { Database } from '@/lib/database.types';
import {
  User,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';

export const useGetUser = (): User | null => {
  const supabase = createClientComponentClient<Database>();
  const [user, setUser] = useState<User | null>(null);
  supabase.auth.getUser().then(({ data }) => {
    setUser(data.user);
  });
  return user;
};
