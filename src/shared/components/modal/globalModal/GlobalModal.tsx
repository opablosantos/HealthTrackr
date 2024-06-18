import { useState } from "react";
import Modal from "../Modal";

const GlobalModal = () => {

    const [visible, setVisible] = useState(true);

    return (
        <Modal title="Teste" text="Testes" visible={visible} onCloseModal={() => setVisible(false)}/>
    )
}

export default  GlobalModal;