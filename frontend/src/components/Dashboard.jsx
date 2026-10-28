import { motion } from "motion/react";
function Dashboard({
  username,
  totalExpenses,
  totalIncome,
  expenses,
  incomes,
  showExpenseForm,
  setShowExpenseForm,
  expenseAmount,
  setExpenseAmount,
  expenseCategory,
  setExpenseCategory,
  expenseDate,
  setExpenseDate,
  paymentMethod,
  setPaymentMethod,
  expenseDescription,
  setExpenseDescription,
  handleAddExpense,
  handleDeleteExpense,
  handleLogout,
  setPage,
}) {
  const balance = totalIncome - totalExpenses;
  return (
    <div className="min-h-screen bg-[#09090f] text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09090f]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/money-icon.png"
              alt="FinTrack"
              className="h-11 w-11 object-contain"
            />
            <div>
              <h1 className="text-xl font-black text-white">
                FinTrack
              </h1>
              <p className="text-xs text-slate-400">
                Personal Finance Manager
              </p>
            </div>
          </div>
          {/* Logout */}
          <motion.button
            type="button"
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-400 transition hover:bg-red-500/20"
          >
            Logout
          </motion.button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-8 pb-32">
        {/* WELCOME */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-sm font-medium text-violet-400">
            DASHBOARD
          </p>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">
            Welcome back, {username || "User"} 👋
          </h2>
          <p className="mt-2 text-slate-400">
            Here's an overview of your finances.
          </p>
        </motion.div>
        {/* STATS */}
        <div className="grid gap-5 md:grid-cols-3">
          {/* Total Balance */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/30 to-fuchsia-600/10 p-6 shadow-xl"
          >
            <p className="text-sm text-slate-400">
              Total Balance
            </p>
            <h3
              className={`mt-3 text-3xl font-black ${
                balance >= 0
                  ? "text-white"
                  : "text-red-400"
              }`}
            >
              ₹{balance.toLocaleString("en-IN")}
            </h3>
            <p className="mt-3 text-sm text-slate-500">
              Income minus expenses
            </p>
          </motion.div>
          {/* Total Income */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-6 shadow-xl"
          >
            <p className="text-sm text-slate-400">
              Total Income
            </p>
            <h3 className="mt-3 text-3xl font-black text-emerald-400">
              ₹{totalIncome.toLocaleString("en-IN")}
            </h3>
            <p className="mt-3 text-sm text-slate-500">
              {incomes.length} income entries
            </p>
          </motion.div>
          {/* Total Expenses */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -5 }}
            className="rounded-3xl border border-rose-500/20 bg-rose-500/10 p-6 shadow-xl"
          >
            <p className="text-sm text-slate-400">
              Total Expenses
            </p>
            <h3 className="mt-3 text-3xl font-black text-rose-400">
              ₹{totalExpenses.toLocaleString("en-IN")}
            </h3>
            <p className="mt-3 text-sm text-slate-500">
              {expenses.length} expense entries
            </p>
          </motion.div>
        </div>
        {/* ACTION BUTTONS */}
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {/* Add Expense */}
          <motion.button
            type="button"
            onClick={() =>
              setShowExpenseForm(!showExpenseForm)
            }
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 p-5 text-left shadow-lg"
          >
            <div className="text-2xl">💸</div>
            <h3 className="mt-3 text-lg font-black">
              Add Expense
            </h3>
            <p className="mt-1 text-sm text-white/70">
              Record a new expense
            </p>
          </motion.button>
          {/* Add Income */}
          <motion.button
            type="button"
            onClick={() => setPage("income")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 p-5 text-left shadow-lg"
          >
            <div className="text-2xl">💰</div>
            <h3 className="mt-3 text-lg font-black">
              Add Income
            </h3>
            <p className="mt-1 text-sm text-white/70">
              Manage your income
            </p>
          </motion.button>
          {/* Transactions */}
          <motion.button
            type="button"
            onClick={() => setPage("transactions")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 p-5 text-left shadow-lg"
          >
            <div className="text-2xl">📊</div>
            <h3 className="mt-3 text-lg font-black">
              View Transactions
            </h3>
            <p className="mt-1 text-sm text-white/70">
              View all your transactions
            </p>
          </motion.button>
          {/* Analysis */}
          <motion.button
            type="button"
            onClick={() => setPage("analysis")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 p-5 text-left shadow-lg"
          >
            <div className="text-2xl">📈</div>
            <h3 className="mt-3 text-lg font-black">
              Financial Analysis
            </h3>
            <p className="mt-1 text-sm text-white/70">
              Analyze your spending
            </p>
          </motion.button>
        </div>
        {/* ADD EXPENSE FORM */}
        {showExpenseForm && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-xl backdrop-blur-xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black">
                  Add New Expense
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Enter the details of your expense.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setShowExpenseForm(false)
                }
                className="text-2xl text-slate-400 hover:text-white"
              >
                ×
              </button>
            </div>
            <form
              onSubmit={handleAddExpense}
              className="grid gap-5 md:grid-cols-2"
            >
              {/* Amount */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Amount
                </label>
                <input
                  type="number"
                  min="1"
                  value={expenseAmount}
                  onChange={(e) =>
                    setExpenseAmount(e.target.value)
                  }
                  placeholder="Enter amount"
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20"
                />
              </div>
              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Category
                </label>
                <select
                  value={expenseCategory}
                  onChange={(e) =>
                    setExpenseCategory(e.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#15151f] px-4 py-3 text-white outline-none focus:border-rose-400"
                >
                  <option>Food</option>
                  <option>Travel</option>
                  <option>Shopping</option>
                  <option>Entertainment</option>
                  <option>Bills</option>
                  <option>Health</option>
                  <option>Education</option>
                  <option>Other</option>
                </select>
              </div>
              {/* Date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Date
                </label>
                <input
                  type="date"
                  value={expenseDate}
                  onChange={(e) =>
                    setExpenseDate(e.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#15151f] px-4 py-3 text-white outline-none focus:border-rose-400"
                />
              </div>
              {/* Payment Method */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#15151f] px-4 py-3 text-white outline-none focus:border-rose-400"
                >
                  <option>Cash</option>
                  <option>UPI</option>
                  <option>Debit Card</option>
                  <option>Credit Card</option>
                  <option>Bank Transfer</option>
                </select>
              </div>
              {/* Description */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Description
                </label>
                <textarea
                  value={expenseDescription}
                  onChange={(e) =>
                    setExpenseDescription(e.target.value)
                  }
                  placeholder="What was this expense for?"
                  rows="3"
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20"
                />
              </div>
              {/* Buttons */}
              <div className="flex gap-4 md:col-span-2">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 py-4 font-bold text-white"
                >
                  Add Expense
                </motion.button>
                <button
                  type="button"
                  onClick={() =>
                    setShowExpenseForm(false)
                  }
                  className="rounded-xl border border-white/10 px-6 py-4 font-bold text-slate-300 hover:bg-white/5"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
        {/* RECENT EXPENSES */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-xl backdrop-blur-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black">
                Recent Expenses
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Your latest expense records
              </p>
            </div>
            {expenses.length > 0 && (
              <button
                type="button"
                onClick={() =>
                  setPage("transactions")
                }
                className="text-sm font-bold text-violet-400 hover:text-violet-300"
              >
                View all →
              </button>
            )}
          </div>
          {/* Empty State */}
          {expenses.length === 0 ? (
            <div className="py-12 text-center">
              <div className="text-5xl">🧾</div>
              <p className="mt-4 text-slate-400">
                No expenses added yet.
              </p>
              <button
                type="button"
                onClick={() =>
                  setShowExpenseForm(true)
                }
                className="mt-4 font-bold text-rose-400 hover:text-rose-300"
              >
                Add your first expense →
              </button>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {expenses
                .slice(0, 5)
                .map((expense) => (
                  <motion.div
                    key={expense.id}
                    whileHover={{ scale: 1.01 }}
                    className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-black/20 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <h3 className="font-bold text-white">
                        {expense.category}
                      </h3>
                      <p className="mt-1 text-sm text-slate-400">
                        {expense.description}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                        <span>
                          📅 {expense.date}
                        </span>
                        <span>
                          💳 {expense.paymentMethod}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-black text-rose-400">
                        - ₹
                        {expense.amount.toLocaleString(
                          "en-IN"
                        )}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteExpense(
                            expense.id
                          )
                        }
                        className="rounded-lg bg-red-500/10 px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
export default Dashboard;