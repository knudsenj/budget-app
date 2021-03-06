import { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import BudgetCard from "./components/BudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetContext";

function App() {
  const [isAddBudgetModalVisible, setIsAddBudgetModalVisible] = useState(false)
  const [isAddExpenseModalVisible, setIsAddExpenseModalVisible] = useState(false)
  const [addExpenseModalId, setAddExpenseModalId] = useState()
  const [viewExpenseModalId, setViewExpenseModalId] = useState()
  const { budgets, expenses, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setIsAddExpenseModalVisible(true)
    setAddExpenseModalId(budgetId)
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={ () => setIsAddBudgetModalVisible(true) }>Add Budget</Button>
          <Button variant="outline-primary" onClick={ () => openAddExpenseModal(UNCATEGORIZED_BUDGET_ID) }>Add Expense</Button>
        </Stack>
        { budgets.length && expenses.length 
          ? <div className="budget-grid">
            { budgets.map(budget => <BudgetCard 
              key={ budget.id }
              name={ budget.name } 
              amount={ getBudgetExpenses(budget.id).reduce((a, c) => a + c.amount, 0) } 
              max={ budget.max }
              onAddExpenseClick={ () => openAddExpenseModal(budget.id) }
              onViewExpensesClick={ () => setViewExpenseModalId(budget.id) }
            />) }
            <UncategorizedBudgetCard 
              onAddExpenseClick={ () => openAddExpenseModal(UNCATEGORIZED_BUDGET_ID) } 
              onViewExpensesClick={ () => setViewExpenseModalId(UNCATEGORIZED_BUDGET_ID) }
            />
            <TotalBudgetCard />
          </div>
          : <div className="text-center">
            <em>You have no budgets, get started by pressing the Add Budget button above</em>
          </div>
        }
      </Container>
      <AddBudgetModal 
        show={ isAddBudgetModalVisible } 
        handleClose={ () => setIsAddBudgetModalVisible(false) }
      />
      <AddExpenseModal 
        show={ isAddExpenseModalVisible } 
        handleClose={ () => setIsAddExpenseModalVisible(false) }
        defaultBudgetId={ addExpenseModalId }
      />
      <ViewExpensesModal 
        budgetId= {viewExpenseModalId }
        handleClose={ () => setViewExpenseModalId(null)}
      />
    </>
  )
}

export default App;
