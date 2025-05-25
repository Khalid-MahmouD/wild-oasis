import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
    //1. numer of bookings
    const numBookings = bookings.length;

    //2. number of confirmed stays
    const sales = bookings.reduce(
        (acc, cur) =>
            cur.totalPrice + acc
        , 0);

    //3. number of check ins
    const numCheckIns = confirmedStays.length;

    //4. occupancy rate
    // num checked in nights / all available nights
    // all available nights = numDays * cabinCount

    const occupation = confirmedStays.reduce(
        (acc, cur) => acc + (cur.numNights || 0),
        0) / (numDays * cabinCount);

    return (
        <>
            <Stat
                title={'Bookings'}
                color={'blue'}
                icon={<HiOutlineBriefcase />}
                value={numBookings}
            />
            <Stat
                title={'Sales'}
                color={'green'}
                icon={<HiOutlineBanknotes />}
                value={formatCurrency(sales)}
            />
            <Stat
                title={'Check ins'}
                color={'indigo'}
                icon={<HiOutlineCalendarDays />}
                value={numCheckIns}
            />
            <Stat
                title={'Occupancy rate'}
                color={'yellow'}
                icon={<HiOutlineChartBar />}
                value={Math.round(occupation * 100) + '%'}
            />
        </>
    )
}

export default Stats
