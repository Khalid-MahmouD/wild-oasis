import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import { updateBooking } from '../../services/apiBookings';

function useEditBooking() {
  const queryClient = useQueryClient();
  const { mutate: editBooking, isLoading: isEditing } = useMutation({
    mutationFn: ({ newBookingDate, id }) => updateBooking(id, newBookingDate),
    onSuccess: () => {
      toast.success('New booking successfully Edited');
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
      // reset();
    },
    onError: (error) => toast.error(error.message),
  });

  return { editBooking, isEditing };
}

export default useEditBooking;
