import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/apiBookings';
import { useParams } from 'react-router-dom';

export function useBooking(bookingIdToEdit) {
  const params = useParams();
  const bookingId = bookingIdToEdit || params.bookingId;

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(bookingId),
    enabled: !!bookingId, // only run if bookingId exists
    retry: false,
  });

  return { isLoading, booking, error };
}
