import { useRef } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetContext";
import { currencyFormatter } from "../utils";

export default function ViewExpensesModal(props) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()

  if (!props.budgetId) return null

  const expenses = getBudgetExpenses(props.budgetId)
  const budget = UNCATEGORIZED_BUDGET_ID === props.budgetId 
    ? { id: UNCATEGORIZED_BUDGET_ID, name: "uncategorized" }
    : budgets.find(budget => budget.id === props.budgetId)

    function handleDelete() {
      deleteBudget(budget)
      props.handleClose()
    }

  return (
    <Modal
      show={ props.budgetId }
      onHide={ props.handleClose }
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expenses - { budget.name }</div>
            { props.budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button variant="outline-danger" onClick={ () => handleDelete() }>Delete</Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        { expenses.length 
          ? <Stack direction="vertical" gap="3">
            { expenses.map(expense => (
              <Stack direction="horizontal" gap="2" key={expense.id}>
                <div className="me-auto fs-4">{expense.description}</div>
                <div className="fs-5">{ currencyFormatter.format(expense.amount) }</div>
                <Button 
                  size="sm" 
                  variant="outline-danger"
                  onClick={ () => deleteExpense(expense) }
                >&times;</Button>
              </Stack>
            ))}
          </Stack>
          : <div className="text-center">
              <em>There are no expenses for { budget.name }</em>
            </div>
        }
      </Modal.Body>
    </Modal>
  )
}
