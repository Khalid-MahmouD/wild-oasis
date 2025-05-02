import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";

function Cabins() {
  const [cabin, setCabin] = useState();
  useEffect(function () {
    async function getAllCabins() {
      getCabins().then((data) => setCabin(data))

    }
    getAllCabins();
  }, [])

  console.log(cabin);
  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img src={cabin[0]?.image ?? ' '} alt='cabin wild oasis' />
    </Row>
  );
}

export default Cabins;
