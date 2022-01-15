import { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import AddBudgetModal from "./components/AddBudgetModal";
import BudgetCard from "./components/BudgetCard";
import { useBudgets } from "./contexts/BudgetContext";

function App() {
  const [isAddBudgetModalVisible, setIsAddBudgetModalVisible] = useState(false)
  const { budgets, getBudgetExpenses } = useBudgets()

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={ () => setIsAddBudgetModalVisible(true) }>Add Budget</Button>
          <Button variant="outline-primary">Add Expense</Button>
        </Stack>
        <div className="budget-grid">
          { budgets.map(budget => <BudgetCard 
            key={ budget.id }
            name={ budget.name } 
            amount={ getBudgetExpenses(budget.id).reduce((a, c) => a + c, 0) } 
            max={ budget.max }
          />) }
          
        </div>
      </Container>
      <AddBudgetModal 
        show={ isAddBudgetModalVisible } 
        handleClose={ () => setIsAddBudgetModalVisible(false) }
      />
    </>
  )
}

export default App;
