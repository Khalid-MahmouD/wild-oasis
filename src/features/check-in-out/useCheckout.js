import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out!`);
      queryClient.setQueryData(['booking', data.id], data);
      // queryClient.invalidateQueries(["bookings"]);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (error) => toast.error(`Error checking in booking: ${error.message}`),
  });

  return { checkout, isCheckingOut };
}
