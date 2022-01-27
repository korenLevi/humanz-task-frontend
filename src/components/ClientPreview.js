import { Button, Row } from 'react-bootstrap'

export const ClientPreview = ({ client, removeClient, editClient }) => {

  const onRemoveClient = (ev) => {
    removeClient(client._id)
  }

  const onEditClient = (ev) => {
    editClient(client)
    // setModalOpen(true)
  }

  if (!client) return <div>loading..</div>
  return (
    <>
      <tr>
        <td className='p-3'>{client.id_number}</td>
        <td className='p-3'>{client.full_name}</td>
        <td className='p-3'>{client.ip_address}</td>
        <td className='p-3'>{client.phone_number}</td>
        <td className='p-3'>
          <Row sm='2' className='justify-content-around'>
            <Button
              onClick={onRemoveClient}
              style={{ maxWidth: '60px', minHeight: '3rem' }}
            >
              <i className='fas fa-trash'></i>
            </Button>
            <Button
              onClick={onEditClient}
              style={{ maxWidth: '60px', minHeight: '3rem' }}
            >
              <i className='fas fa-edit'></i>
            </Button>
          </Row>
        </td>
      </tr>
    </>
  )
}
