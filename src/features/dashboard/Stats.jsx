import { HiOutlineBriefcase, HiOutlineChartBar } from 'react-icons/hi';
import { HiOutlineBanknotes, HiOutlineCalendarDays } from 'react-icons/hi2';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // 1. Number of bookings
  const numBookings = bookings.length;

  // 2. Total sales
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3. Number of check-ins
  const numCheckIns = confirmedStays.length;

  // 4. Occupancy rate
  // num checked-in nights / all available nights
  // all available nights = numDays * cabinCount
  const totalNights = confirmedStays.reduce((acc, cur) => acc + (cur.numNights || 0), 0);
  const occupation =
    numDays && cabinCount ? Math.round((totalNights / (numDays * cabinCount)) * 100) : 0;

  const statsData = [
    {
      title: 'Bookings',
      color: 'blue',
      icon: <HiOutlineBriefcase />,
      value: numBookings,
    },
    {
      title: 'Sales',
      color: 'green',
      icon: <HiOutlineBanknotes />,
      value: formatCurrency(sales),
    },
    {
      title: 'Check ins',
      color: 'indigo',
      icon: <HiOutlineCalendarDays />,
      value: numCheckIns,
    },
    {
      title: 'Occupancy rate',
      color: 'yellow',
      icon: <HiOutlineChartBar />,
      value: `${occupation}%`,
    },
  ];

  return (
    <>
      {statsData.map((stat) => (
        <Stat
          key={stat.title}
          title={stat.title}
          color={stat.color}
          icon={stat.icon}
          value={stat.value}
        />
      ))}
    </>
  );
}

export default Stats;
