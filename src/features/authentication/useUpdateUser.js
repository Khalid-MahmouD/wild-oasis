import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateCurrentUser } from '../../services/ApiAuth';

function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success('User successfully updated');
      queryClient.setQueryData(['user'], user);
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { updateUser, isUpdating };
}

export default useUpdateUser;
