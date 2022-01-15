import { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useBudgets } from "../contexts/BudgetContext";

export default function AddBudgetModal(props) {
  const nameRef = useRef()
  const maxRef = useRef()
  const { addBudget } = useBudgets()

  function handleSubmit(e) {
    e.preventDefault()
    addBudget({ 
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value)
    })

    props.handleClose()
  }

  return (
    <Modal
      show={ props.show }
      onHide={ props.handleClose }
    >
      <Form onSubmit={ handleSubmit }>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={ nameRef } type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Max</Form.Label>
            <Form.Control ref={ maxRef } type="number" required min={ 0 } step={ 0.01 } />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">Add</Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}
