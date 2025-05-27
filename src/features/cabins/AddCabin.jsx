import { Button } from 'antd';
import { useState } from 'react';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';
import CabinTable from './CabinTable';

function AddCabin() {
  // all we need is a button and window display the
  // content we wanna show
  return (
    <div>
      <Modal>
        <Modal.Open opens={'cabin-form'}>
          <Button type="primary" block size="large">
            Add new cabin
          </Button>
        </Modal.Open>
        <Modal.Window name={'cabin-form'}>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
// function AddCabin() {
//     const [isOpenModal, setIsOpenModal] = useState(false);

//     return (
//         <div>
//             <Button
//                 block
//                 type="primary"
//                 size="large"
//                 onClick={() => setIsOpenModal((sf) => !sf)}
//             >
//                 Add new cabin
//             </Button>
//             {isOpenModal && (
//                 <Modal onClose={() => setIsOpenModal(false)}>
//                     <CreateCabinForm onClose={() => setIsOpenModal(false)} />
//                 </Modal>
//             )}
//         </div>
//     );
// }

export default AddCabin;
