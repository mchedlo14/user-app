import axios from "axios";
import DataTable from "react-data-table-component";
import { StyledDataTable } from "./DataTable.Styled";
import { useState, useEffect } from "react";
import '../../index.css';
import ModalComponent from "../Modal/ModalComponent";
import {Button, Modal } from 'react-bootstrap';
import {Input} from 'antd';
import Chart from "../Chart/Chart";




function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [isDeleteOperation, setIsDeleteOperation] = useState(false)
  const [modalOpen,setModalOpen] = useState(false)
  const [modalStart,setModalStart] = useState(false)
  const [dataObj] = useState({
    name: "",
    email: "",
    gender: "",
    address: {
        street: "",
        city: ""
    },
    phone: ""
  })

  const deleteRow = (index) => {
    axios.delete(`http://localhost:3000/users/${index}`)
    setIsDeleteOperation(true)
  }

  const columns = [
    {
      name: "User ID",
      selector: (row) => row.id,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email ,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Street",
      selector: (row) => row.address.street,
    },
    {
      name: "City",
      selector: (row) => row.address.city,
    },
    {
      cell:(row) => <button className='delete-btn' onClick={(e) => deleteRow(row.id)}>Delete</button>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ]

  
  async function fetchTableData() {
    setLoading(true)
    const URL = "http://localhost:3000/users"
    const response = await fetch(URL)
    
    const users = await response.json()
    setData(users.data)
    setLoading(false)
    setIsDeleteOperation(false)
  }
  
  useEffect(() => {
    fetchTableData()
  }, [isDeleteOperation])
  

  const modalFunc = (row) => {
    setModalStart(true)
    dataObj.name = row.name
    dataObj.email = row.email
    dataObj.phone = row.phone
    dataObj.address.city = row.address.city
    dataObj.address.street = row.address.street
  }

  const handleAddUser = async () => {
    const response = await axios.post('http://localhost:3000/users', dataObj)
    console.log(response)
    setIsDeleteOperation(true)
    setModalStart(false)
  }

  return (
    <div className="wrapper">
      <StyledDataTable style={{marginTop:40}}>
          <DataTable
            title="User Data"
            columns={columns}
            data={data}
            progressPending={loading}
            pagination
            onRowDoubleClicked={(row, event) => {modalFunc(row)}}
          />
          

          <Modal show={modalStart}>
            <Modal.Header>Add row in table</Modal.Header>
            
            <Modal.Body>
              <Input placeholder='Name' onChange={e => dataObj.name = e.target.value} defaultValue={dataObj.name} style={{marginTop:10}} allowClear></Input>
              <Input placeholder='Email' defaultValue={dataObj.email} style={{marginTop:10}} allowClear></Input>
              

              <select defaultValue={dataObj.gender} style={{marginTop:10}}>
                <option disabled>Choose gender</option>
                <option value='male'>Male</option>
                <option value='Female'>Female</option>
              </select>


              <Input placeholder='Street' defaultValue={dataObj.address.street} style={{marginTop:10}} allowClear></Input>
              <Input placeholder='City' defaultValue={dataObj.address.city} style={{marginTop:10}} allowClear></Input>
              <Input placeholder='Phone' defaultValue={dataObj.phone} style={{marginTop:10}} allowClear></Input>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={handleAddUser}>Add User</Button>
                <Button onClick={() => setModalStart(false)}>Close Modal</Button>
            </Modal.Footer>
        </Modal>



        <Button className="add-btn" onClick={() => setModalOpen(true)}>Add User</Button>
          <ModalComponent setModalOpen={setModalOpen} modalOpen={modalOpen} setIsDeleteOperation={setIsDeleteOperation}/>
      </StyledDataTable>

      <Chart />
    </div>
  )
}

export default App