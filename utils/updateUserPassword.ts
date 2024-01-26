import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';

export const updateUserPassword = async (
  oldPassword: string,
  newPassword: string
) => {
  const supabase = createClientComponentClient<Database>();
  // Verify the current password
  const { data } = await supabase.rpc('verify_user_password', {
    password: oldPassword,
  });
  if (!data) {
    throw new Error('Wrong current password');
  }

  // Update to the new password if the old one is correct
  if (data) {
    const updateResponse = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (updateResponse.data) {
      return 'Password updated successfully';
    }
  }
  throw new Error('Something went wrong. Please try again.');
};

//SQL function to verify user password
/*
SET search_path = extensions, public, auth;

CREATE OR REPLACE FUNCTION public.verify_user_password(password text)
RETURNS BOOLEAN SECURITY DEFINER AS
$$
DECLARE
  user_id uuid;
BEGIN
  user_id := auth.uid();
  RETURN EXISTS (
    SELECT id
    FROM auth.users
    WHERE id = user_id AND encrypted_password = crypt(password::text, auth.users.encrypted_password)
  );
END;
$$ LANGUAGE plpgsql;
*/
