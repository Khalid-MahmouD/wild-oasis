import { Button } from "antd";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
    return (
        <Modal>
            <Modal.Open opens="cabin-form">
                <Button type="primary" block>
                    Add new Cabin
                </Button>
            </Modal.Open>
            <Modal.Window name="cabin-form">
                <CreateCabinForm />
            </Modal.Window>
        </Modal>
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
