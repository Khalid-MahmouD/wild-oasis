import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi} from "../../services/apiBookings";
import toast from "react-hot-toast";

function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    // mutationFn: (id) => deleteBookings(id),
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("Booking Deleted Successfully");
      // Invalidate and refetch the bookings data
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (error) => {
      // Invalidate and refetch the bookings data
      toast.error(error.message);
    },
  });
  return { isDeleting, deleteBooking };
}

export default useDeleteBooking;
