import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import {  putUpdateUser } from "../services/UserService";
import { toast } from 'react-toastify';

const ModalEditUsers = (props) => {
  const {show, handleClose, dataUserEdit, handleEditUserFromModal } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleEditUser = async () => {
    
      let res = await putUpdateUser(name, job);
      if(res && res.updatedAt){
        console.log(1)
        handleEditUserFromModal({
          first_name: name,
          id: dataUserEdit.id
          });

          handleClose();
          toast.success("Bạn vừa chỉnh sửa thông tin người dùng thành công");
      }
  }

  

  useEffect(() => {
    if(show){
      setName(dataUserEdit.first_name);
    }
  }, [dataUserEdit])


  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit A User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-edit-new">
            <div className="md-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" value={name}
              onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="md-3">
              <label className="form-label">Job</label>
              <input type="text" className="form-control" value={job}
              onChange={(event) => setJob(event.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleEditUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditUsers;
