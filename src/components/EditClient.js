import { useEffect, useRef, useState } from 'react'
import { useForm } from '../hooks/useForm'
import { Modal, Form, Row, Col, Button, FloatingLabel , Alert} from 'react-bootstrap'
import { clientService } from '../services/clientService'
import { Loading } from './Loading'
export const EditClient = (props) => {
  const [show, setShow] = useState(false);
  const [client, handleChange, setClient] = useForm(null)
  const inputRef = useRef()

  useEffect(() => {
    const client = props.client ? props.client : clientService.getEmptyClient()
    setClient(client)
  }, [])


  const onSaveClient = async (ev) => {
    ev.preventDefault()
    if(!clientService.checkValidation(client)) {
      setShow(true)
      setTimeout(()=>{
        setShow(false)
      },3500)
      return
    }
    props.saveClient(client)
    handleClose()
  }

  const handleClose = () => {
    props.closeModal()
  }
  if (!client) return <Loading />
  return (
    <>
    <Modal show={props.show} onHide={handleClose} centered className='pb-5'>
        <Alert show={show} variant='danger'>
          Invaild Values
        </Alert>
      <Modal.Header closeButton>
        <Modal.Title>Add Client</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          <Row className='pb-3'>
            <Col>
              <FloatingLabel label='Full name:'>
                <Form.Control
                  ref={inputRef}
                  onChange={handleChange}
                  type='text'
                  value={client.full_name}
                  placeholder='name input'
                  name='full_name'
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label='ID:'>
                <Form.Control
                  ref={inputRef}
                  onChange={handleChange}
                  type='text'
                  value={client.id_number}
                  placeholder='name input'
                  name='id_number'
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className='pt-2 pb-3'>
            <Col>
              <FloatingLabel label='IP address:'>
                <Form.Control
                  ref={inputRef}
                  onChange={handleChange}
                  type='text'
                  value={client.ip_address}
                  placeholder='name input'
                  name='ip_address'
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label='Phone number:'>
                <Form.Control
                  ref={inputRef}
                  onChange={handleChange}
                  type='text'
                  value={client.phone_number}
                  placeholder='name input'
                  name='phone_number'
                />
              </FloatingLabel>
            </Col>
          </Row>
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={onSaveClient} >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}

