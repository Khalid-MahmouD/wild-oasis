import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinDate, id }) => createEditCabin(newCabinDate, id),
    onSuccess: () => {
      toast.success("New cabin successfully Edited");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      // reset();
    },
    onError: (error) => toast.error(error.message),
  });

  return { editCabin, isEditing };
}

export default useEditCabin;
