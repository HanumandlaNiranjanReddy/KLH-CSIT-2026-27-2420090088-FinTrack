import { motion } from "motion/react";
function Analysis({
  incomes,
  expenses,
  totalIncome,
  totalExpenses,
  setPage,
}) {
  const balance = totalIncome - totalExpenses;
  const savingsRate =
    totalIncome > 0
      ? ((balance / totalIncome) * 100).toFixed(1)
      : "0.0";
  const incomeBySource = incomes.reduce(
    (result, income) => {
      const source = income.source || "Other";
      result[source] =
        (result[source] || 0) +
        Number(income.amount);
      return result;
    },
    {}
  );
  const expenseByCategory = expenses.reduce(
    (result, expense) => {
      const category =
        expense.category || "Other";
      result[category] =
        (result[category] || 0) +
        Number(expense.amount);

      return result;
    },
    {}
  );
  const sortedIncomeSources = Object.entries(
    incomeBySource
  ).sort((a, b) => b[1] - a[1]);
  const sortedExpenseCategories = Object.entries(
    expenseByCategory
  ).sort((a, b) => b[1] - a[1]);
  return (
    <div className="min-h-screen bg-slate-100 px-6 py-8 text-slate-800">
      {/* Back button */}
      <motion.button
        type="button"
        onClick={() => setPage("dashboard")}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="mb-6 rounded-xl bg-white px-4 py-2 font-semibold shadow-sm"
      >
        ← Back to Dashboard
      </motion.button>
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">
          Financial Analysis
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Understand your income, expenses and savings.
        </p>
      </div>
      {/* Summary cards */}
      <div className="grid gap-5 md:grid-cols-4">
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-2xl bg-white p-6 shadow-sm"
        >
          <p className="text-sm font-medium text-slate-500">
            Total Income
          </p>
          <h2 className="mt-2 text-3xl font-black text-emerald-600">
            ₹{totalIncome.toLocaleString("en-IN")}
          </h2>
        </motion.div>
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-2xl bg-white p-6 shadow-sm"
        >
          <p className="text-sm font-medium text-slate-500">
            Total Expenses
          </p>
          <h2 className="mt-2 text-3xl font-black text-red-500">
            ₹{totalExpenses.toLocaleString("en-IN")}
          </h2>
        </motion.div>
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-2xl bg-white p-6 shadow-sm"
        >
          <p className="text-sm font-medium text-slate-500">
            Current Balance
          </p>
          <h2
            className={`mt-2 text-3xl font-black ${
              balance >= 0
                ? "text-violet-600"
                : "text-red-600"
            }`}
          >
            ₹{balance.toLocaleString("en-IN")}
          </h2>
        </motion.div>
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-2xl bg-white p-6 shadow-sm"
        >
          <p className="text-sm font-medium text-slate-500">
            Savings Rate
          </p>
          <h2 className="mt-2 text-3xl font-black text-blue-600">
            {savingsRate}%
          </h2>
        </motion.div>
      </div>
      {/* Income and Expense Analysis */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Income by source */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white p-6 shadow-sm"
        >
          <h2 className="text-xl font-black text-slate-900">
            Income by Source
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Where your money comes from.
          </p>
          <div className="mt-5 space-y-4">
            {sortedIncomeSources.length === 0 ? (
              <p className="text-sm text-slate-400">
                No income data available.
              </p>
            ) : (
              sortedIncomeSources.map(
                ([source, amount]) => {
                  const percentage =
                    totalIncome > 0
                      ? (amount / totalIncome) *
                        100
                      : 0;
                  return (
                    <div key={source}>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-semibold">
                          {source}
                        </span>
                        <span className="font-bold text-emerald-600">
                          ₹
                          {amount.toLocaleString(
                            "en-IN"
                          )}
                        </span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-emerald-500"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                }
              )
            )}
          </div>
        </motion.div>
        {/* Expense by category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white p-6 shadow-sm"
        >
          <h2 className="text-xl font-black text-slate-900">
            Expenses by Category
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Where your money is being spent.
          </p>
          <div className="mt-5 space-y-4">
            {sortedExpenseCategories.length === 0 ? (
              <p className="text-sm text-slate-400">
                No expense data available.
              </p>
            ) : (
              sortedExpenseCategories.map(
                ([category, amount]) => {
                  const percentage =
                    totalExpenses > 0
                      ? (amount / totalExpenses) *
                        100
                      : 0;

                  return (
                    <div key={category}>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-semibold">
                          {category}
                        </span>

                        <span className="font-bold text-red-500">
                          ₹
                          {amount.toLocaleString(
                            "en-IN"
                          )}
                        </span>
                      </div>

                      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-red-500"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                }
              )
            )}
          </div>
        </motion.div>
      </div>

      {/* Income vs Expense */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 rounded-2xl bg-white p-6 shadow-sm"
      >
        <h2 className="text-xl font-black text-slate-900">
          Income vs Expenses
        </h2>

        <div className="mt-6 space-y-5">
          <div>
            <div className="mb-2 flex justify-between">
              <span className="font-semibold">
                Income
              </span>

              <span className="font-bold text-emerald-600">
                ₹{totalIncome.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="h-5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{
                  width:
                    totalIncome > 0
                      ? "100%"
                      : "0%",
                }}
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex justify-between">
              <span className="font-semibold">
                Expenses
              </span>

              <span className="font-bold text-red-500">
                ₹{totalExpenses.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="h-5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-red-500"
                style={{
                  width:
                    totalIncome > 0
                      ? `${Math.min(
                          (totalExpenses /
                            totalIncome) *
                            100,
                          100
                        )}%`
                      : "0%",
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
      {/* Financial summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 rounded-2xl bg-white p-6 shadow-sm"
      >
        <h2 className="text-xl font-black text-slate-900">
          Financial Summary
        </h2>
        <p className="mt-3 text-slate-600">
          You earned ₹
          {totalIncome.toLocaleString("en-IN")} and
          spent ₹
          {totalExpenses.toLocaleString("en-IN")}.
          Your current balance is ₹
          {balance.toLocaleString("en-IN")}.
        </p>
        {balance > 0 ? (
          <p className="mt-2 font-semibold text-emerald-600">
            You are currently saving more than you spend.
          </p>
        ) : balance < 0 ? (
          <p className="mt-2 font-semibold text-red-600">
            Your expenses are currently higher than your income.
          </p>
        ) : (
          <p className="mt-2 font-semibold text-amber-600">
            Your income and expenses are currently equal.
          </p>
        )}
      </motion.div>
    </div>
  );
}
export default Analysis;