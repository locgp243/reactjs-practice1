import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { deleteUser } from "../services/UserService";
import { toast } from 'react-toastify';

const ModalConfirm = (props) => {
  const {show, handleClose, dataUserDelete, handleDeleteUserFromModal } = props;


  const confirmDelete = async () => {
    let res = await deleteUser(dataUserDelete.id) 
    if(res && +res.statusCode === 204){
      toast.success("Delete User Success");
      handleDeleteUserFromModal(dataUserDelete)
      handleClose();
    }else{
      toast.error("Delete User Error");
    }
    console.log(res)


  }

  

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Delete A User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            Bạn có chắc rằng mình muốn xóa người dùng có email dưới đây không?
            <br />

            <h6>Email = {dataUserDelete.email}</h6>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => confirmDelete()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirm;
