import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import BookingTableOperations from "./BookingTableOperations";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  // get the params that we will filter and sort by
  const { bookings, isLoading, count } = useBookings();
  // const [searchParams] = useSearchParams();
  // const filterValue = searchParams.get("status") || "all";
  // const sortBy = searchParams.get("sortBy") || "startDate-asc";
  // const [field, direction] = sortBy.split("-");
  // const modifier = direction === "asc" ? 1 : -1;

  // Client side filter and sort

  // 1. FILTER
  // const filteredBookings = bookings?.filter((booking) => (
  //   booking.status === filterValue || filterValue === "all"
  // ))

  // 2. SORT
  // const sortedBookings = filteredBookings?.sort((a, b) => (
  //   (a[field] - b[field]) * modifier
  // ))

  // console.table(sortedBookings);

  console.log(bookings);
  if (isLoading) return <Spinner />;

  if (!bookings?.length) return <Empty resourceName="Bookings" />;


  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">

        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
