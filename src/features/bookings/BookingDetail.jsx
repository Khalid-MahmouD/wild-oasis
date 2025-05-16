import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from '../../ui/Spinner'
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { statusToTagName } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { HiArrowDownOnSquare } from "react-icons/hi2";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const moveBack = useMoveBack();
  const { status, id: bookingId } = booking || {};
  const navigate = useNavigate();

  if (isLoading || !booking) return <Spinner />


  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && <Button
          icon={<HiArrowDownOnSquare />}
          onClick={() => navigate(`/checkin/${bookingId}`)} // corrected the typo here
        >
          Check in
        </Button>}

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
