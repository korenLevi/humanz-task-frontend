import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Table,
  InputGroup,
  FormControl,
} from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { ClientPreview } from '../components/ClientPreview'
import {
  loadClients,
  removeClient,
  saveClient,
} from '../store/actions/clientActions'
import { Loading } from '../components/Loading'
import { Pagination } from '../components/Pagination'
import { EditClient } from '../components/EditClient'
export const Home = () => {
  
  const dispatch = useDispatch()
  const { clients } = useSelector((state) => state.clientModule)
  const [keyword, setKeyword] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [clientToEdit, setClientToEdit] = useState(null)
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    dispatch(loadClients())
  }, [])

  const handleChange = ({ target }) => {
    setKeyword(target.value)
    dispatch(loadClients(target.value))
    setIdx(0)
  }
  const onRemoveClient = (id) => {
    dispatch(removeClient(id))
  }
  const onPagination = (inc) => {
    setIdx(idx + inc)
  }

  const onModalOpen = (bool) => {
    setModalOpen(bool)
    setClientToEdit(null)
  }

  const onEditClient = (client) => {
    setClientToEdit(client)
    setModalOpen(true)
  }

  const onSaveClient = (clientToSave) => {
    dispatch(saveClient(clientToSave))
  }

  if (!clients) return <Loading></Loading>

  return (
    <div>
      <div className='my-3 d-flex align-items-center justify-content-between'>
        <div>
          <InputGroup >
            <FormControl type='text'
            placeholder='Search...'
            className='p-2'
            value={keyword}
            onChange={handleChange} aria-label='Example text with two button addons' />
          </InputGroup>
        </div>

        <Button
          onClick={() => onModalOpen(true)}
          className='me-3'
          type='button'
          variant='dark'
        >
          <i className='fas fa-plus-square'></i>
        </Button>
      </div>
      <Table
        responsive='lg'
        striped={false}
        bordered
        hover
        variant='light'
        size='sm'
      >
        <thead bg='blue'>
          <tr>
            <th className='p-3'>ID</th>
            <th className='p-3'>Full name</th>
            <th className='p-3'>IP address</th>
            <th className='p-3'>Phone number</th>
            <th className='p-3'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.slice(idx, idx + 8).map((client) => (
            <ClientPreview
              removeClient={onRemoveClient}
              client={client}
              key={client.id_number}
              editClient={onEditClient}
            />
          ))}
        </tbody>
      </Table>
      <Pagination clients={clients} onInc={onPagination} pageIdx={idx} />
      {modalOpen ? (
        <EditClient
          closeModal={() => onModalOpen(false)}
          saveClient={onSaveClient}
          show={modalOpen}
          client={clientToEdit}
        />
      ) : (
        <></>
      )}
    </div>
  )
}
{
}
