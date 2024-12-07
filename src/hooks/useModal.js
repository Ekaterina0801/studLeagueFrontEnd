import { useState } from "react";


export const useModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("");
  
    return {
      showModal,
      modalType,
      setShowModal,
      setModalType,
    };
  };
