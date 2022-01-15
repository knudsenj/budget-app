import React, { useContext, useState } from "react"
import { v4 as uuidV4 } from 'uuid';

const BudgestContext = React.createContext();

export function useBudgets() {
  return useContext(BudgestContext)
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  
  function getBudgetExpenses(budgetId) {
    return expenses.filter(expense => expense.budgetId === budgetId)
  }

  function addExpense({ description, amount, budgetId }) {
    setExpenses(prevExpenses => {
      return [
        ...prevExpenses, 
        {
          id: uuidV4(), 
          description, 
          amount,
          budgetId
        }
      ]
    })
  }

  function addBudget({ name, max }) {
    setBudgets(prevBudgets => {
      if (prevBudgets.find(budget => budget.name === name)) {
        return prevBudgets
      }

      return [
        ...prevBudgets, 
        {
          id: uuidV4(), 
          name, 
          max,
        }
      ]
    })
  }

  function deleteExpense({ id }) {
    setExpenses(prevExpenses => prevExpenses.filter(budget => budget.id !== id));
  }

  function deleteBudget({ id }) {
    // TODO: Deal with expenses
    setBudgets(prevBudgets => prevBudgets.filter(budget => budget.id !== id));
  }

  return <BudgestContext.Provider value={{
    budgets,
    expenses,
    getBudgetExpenses,
    addExpense,
    addBudget,
    deleteExpense,
    deleteBudget
  }}>
    { children }
  </BudgestContext.Provider>
}