import axios from "axios"
import DataTable from "react-data-table-component"
import { StyledDataTable } from "./DataTable.Styled";
import { useState, useEffect } from "react";
import '../../index.css'
import ButtonComponent from "../Button/Button.Component";
import { Button } from "react-bootstrap";
import ModalComponent from "../Modal/ModalComponent";

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [isDeleteOperation, setIsDeleteOperation] = useState(false)
  const [modalOpen,setModalOpen] = useState(false)

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

  useEffect(() => {
    fetchTableData()
  }, [isDeleteOperation])

  async function fetchTableData() {
    setLoading(true)
    const URL = "http://localhost:3000/users"
    const response = await fetch(URL)

    const users = await response.json()
    setData(users.data)
    setLoading(false)
    setIsDeleteOperation(false)
  }

  const addUser = async (userDataToAdd = {}) => {
    const userToAdd = {
      name: "Levan Gldaneli",
      email: "romanayala@gology.com",
      gender: "male",
      address: {
          street: "Garnet Street",
          city: "Chicago"
      },
      phone: "+1 (810) 564-2473"
    }
    

  const response = await axios.post('http://localhost:3000/users', userToAdd)
  console.log(response)

  // Rerender the component
  setIsDeleteOperation(true)
  }

  useEffect(() => {
    console.log(modalOpen)
  },[modalOpen])
  return (
    <div className="wrapper">
    <StyledDataTable>
      <Button className="add-btn" onClick={() => setModalOpen(true)}>Add User</Button>
        <DataTable
          title="User Data"
          columns={columns}
          data={data}
          progressPending={loading}
          onRowClicked= {(row, event) => {console.log(row.id)}}
          pagination
        />
        <ModalComponent setModalOpen={setModalOpen} modalOpen={modalOpen} setIsDeleteOperation={setIsDeleteOperation}/>
    </StyledDataTable>
    </div>
  )
}

export default App