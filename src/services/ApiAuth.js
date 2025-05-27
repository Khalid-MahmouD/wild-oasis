import supabase, { supabaseUrl } from './supabase';

export async function signup({ fullName, email, password }) {
  let { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        fullName,
        avatar: '',
        address: '',
        location: '',
        testing: '',
      },
    },
  });

  if (error) throw new Error(error.message);

  return { data, error };
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) throw new Error(error.message);

  return { data, error };
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. update the password || fullName

  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);

  if (!avatar) return { data };
  // 2. update the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}.png`;

  const { error: storageError } = await supabase.storage.from('avatars').upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  // 3. update the user avatar in the user_metadata

  const { data: updatedUser, error: avatarError } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (avatarError) throw new Error(avatarError.message);

  return { updatedUser };
}
