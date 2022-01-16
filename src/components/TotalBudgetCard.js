import { useBudgets } from "../contexts/BudgetContext";
import BudgetCard from "./BudgetCard";

export default function TotalBudgetCard() {
  const { budgets, expenses } = useBudgets()
  const amount = expenses.reduce((a, c) => a + c.amount, 0)
  const max = budgets.reduce((a, c) => a + c.max, 0) || null

  return max && (
    <BudgetCard 
      amount={ amount }
      max={ max }
      name="Total"
      isGray
      isNonInteractive
    />
  )
}
