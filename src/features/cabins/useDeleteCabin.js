import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabins as deleteCabinApi } from '../../services/apiCabins';
import toast from 'react-hot-toast';

function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { mutate: deleteCabin, isLoading: isDeleting } = useMutation({
    // mutationFn: (id) => deleteCabins(id),
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success('Cabin Deleted Successfully');
      // Invalidate and refetch the cabins data
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (error) => {
      // Invalidate and refetch the cabins data
      toast.error(error.message);
    },
  });
  return { isDeleting, deleteCabin };
}

export default useDeleteCabin;
