import React, { useState } from 'react'
import {Button, Modal } from 'react-bootstrap';
import {Input} from 'antd'
import axios from 'axios';


const ModalComponent = ({modalOpen,setModalOpen,setIsDeleteOperation}) => {
  const [newUser,setNewUser] = useState({
    name: "",
    email: "",
    gender: "male",
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
    setModalOpen(false)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const select_gender = ['Female', 'Male']

  return (
    <>
        <Modal show={modalOpen}>
            <Modal.Header>Add row in table</Modal.Header>
            
            <Modal.Body>
              <Input placeholder='Name' onChange={e => newUser.name = e.target.value} style={{marginTop:10}} allowClear></Input>
              <Input placeholder='Email' onChange={e => newUser.email = e.target.value} style={{marginTop:10}} allowClear></Input>
              

              <select onChange={e => newUser.gender = e.target.value}>
                <option disabled>Choose gender</option>
                <option value='male'>Male</option>
                <option value='Female'>Female</option>
              </select>

              {/* <Select placeholder='Choose Gender' onChange={e => newUser.gender = e.target.value} style={{width:465, marginTop:10}}> */}
                {/* {
                  select_gender.map((el,index) => {
                    return <Select.Option value={el} key={index}>{el}</Select.Option>
                  })
                } */}
              {/* </Select> */}

              <Input placeholder='Street' onChange={e => newUser.address.street = e.target.value} style={{marginTop:10}} allowClear></Input>
              <Input placeholder='City' onChange={e => newUser.address.city = e.target.value} style={{marginTop:10}} allowClear></Input>
              <Input placeholder='Phone' onChange={e => newUser.phone = e.target.value} style={{marginTop:10}} allowClear></Input>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={handleAddUser}>Add User</Button>
                <Button onClick={handleCloseModal}>Close Modal</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default ModalComponent