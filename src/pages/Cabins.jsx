import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";
import CabinRow from "../features/cabins/CabinRow";

function Cabins() {


  return (
    <>

      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sorter</p>

      </Row>
      <Row>
        <CabinTable>
          TABLE
        </CabinTable>
      </Row>
    </>
  );
}

export default Cabins;
