import React from 'react'
import { useGlobalContext } from '../context'
import { Modal } from '.';

function ShowModal() {
    const {modalState} = useGlobalContext();
    switch (modalState.type) {
        case "create":
            return <Modal type={"create"} />
        case "edit":
            return <Modal type={"edit"} />
        default:
            return null
    }
}  




export default ShowModal
