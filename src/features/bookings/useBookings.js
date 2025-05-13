import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get('status');
  
  //  1. FILTER
  const filters = !filterValue || filterValue === "all" ? [] :
   [
    {field: 'status', value: filterValue},
    {field: 'totalPrice', value: 5000, method: 'gte'},
    {field: 'totalPrice', value: 8000, method: 'lte'}
  ];

  // 2. SORT
  const sortByRaw = searchParams.get('sortBy') || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = {
    field, direction
  }

  // 3. PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"))
  console.log(page);
  const {
    isLoading,
    data: {data:bookings, count} = {},
    error,

  } = useQuery({
    queryKey: ["bookings", filters, sortBy, page],
    queryFn: () => getBookings({ filters, sortBy, page }),
  });
  
  if (error) {
    console.error(error);
  }

  return { isLoading, bookings, count };
}
