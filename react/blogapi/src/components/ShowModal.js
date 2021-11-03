import React from 'react'
import { useGlobalContext } from '../context'
import { Modal } from '.';

function ShowModal() {
    const {modalState} = useGlobalContext();
    if (modalState.isModalOpen) {
        switch (modalState.type) {
            case "create":
                return <Modal />
            case "edit":
               return <Modal />
            default:
                return null
        }
    }  else {
        return null
    }
}



export default ShowModal
