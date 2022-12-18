import React, { useState } from 'react'
import {Button, Modal, FormGroup, } from 'react-bootstrap';
import {Input} from 'antd'
import axios from 'axios';
const ModalComponent = ({modalOpen,setModalOpen,setIsDeleteOperation}) => {
  const [newUser,setNewUser] = useState({
    name: "",
    email: "",
    gender: "",
    address: {
        street: "",
        city: ""
    },
    phone: ""
  })


  const handleAddUser = async () => {
    const response = await axios.post('http://localhost:3000/users', newUser)
    console.log(response)
    setIsDeleteOperation(true)
  }

  return (
    <>
        <Modal show={modalOpen}>
            <Modal.Header>Add row in table</Modal.Header>
            <Modal.Body>
              <input placeholder='Name' onChange={e => newUser.name = e.target.value}/>  
              <input placeholder='Email' onChange={e => newUser.email = e.target.value}/>

              <select onChange={e => newUser.gender = e.target.value}>
                <option value='male'>male</option>
                <option value='female'>female</option>
              </select>

              <input placeholder='Street' onChange={e => newUser.address.street = e.target.value}/>   
              <input placeholder='City' onChange={e => newUser.address.city = e.target.value}/> 
              <input placeholder='Phone' onChange={e => newUser.phone = e.target.value}/>     
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleAddUser}>Add User</Button>
                <Button onClick={() => setModalOpen(false)}>Close Modal</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default ModalComponent