import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetContext";
import BudgetCard from "./BudgetCard";

export default function UncategorizedBudgetCard(props) {
  const { getBudgetExpenses } = useBudgets()
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce((a, c) => a + c.amount, 0) || null

  return amount && (
    <BudgetCard 
      amount={ amount }
      name="Uncategorized"
      isGray
      {...props}
    />
  )
}
