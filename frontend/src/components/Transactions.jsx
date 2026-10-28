import { useState } from "react";
import { motion } from "motion/react";
function Transactions({
  expenses,
  incomes,
  totalExpenses,
  totalIncome,
  handleDeleteExpense,
  handleDeleteIncome,
  setPage,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const transactions = [
    ...incomes.map((income) => ({
      ...income,
      type: "income",
    })),
    ...expenses.map((expense) => ({
      ...expense,
      type: "expense",
    })),
  ].sort(
    (a, b) =>
      new Date(b.date) - new Date(a.date)
  );
  const balance = totalIncome - totalExpenses;
  const filteredTransactions =
    transactions.filter((transaction) => {
      const search = searchTerm
        .trim()
        .toLowerCase();
      const matchesSearch =
        !search ||
        (transaction.type === "income"
          ? transaction.source
              ?.toLowerCase()
              .includes(search)
          : (
              transaction.category +
              " " +
              (transaction.description || "")
            )
              .toLowerCase()
              .includes(search));
      const matchesType =
        typeFilter === "all" ||
        transaction.type === typeFilter;
      const matchesCategory =
        categoryFilter === "all" ||
        transaction.type === "income" ||
        transaction.category === categoryFilter;
      return (
        matchesSearch &&
        matchesType &&
        matchesCategory
      );
    });
  const clearFilters = () => {
    setSearchTerm("");
    setTypeFilter("all");
    setCategoryFilter("all");
  };
  return (
    <div className="min-h-screen bg-[#09090f] px-5 py-8 text-white">
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}
        <motion.button
          type="button"
          onClick={() => setPage("dashboard")}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mb-10 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
        >
          ← Back to Dashboard
        </motion.button>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-sm font-bold tracking-widest text-violet-400">
            FINANCIAL HISTORY
          </p>
          <h1 className="mt-2 text-4xl font-black sm:text-5xl">
            Transactions
          </h1>
          <p className="mt-3 text-slate-400">
            View and manage all your income and expenses.
          </p>
        </motion.div>
        {/* Summary Cards */}
        <div className="mb-10 grid gap-5 md:grid-cols-3">
          {/* Income */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-6"
          >
            <p className="text-sm text-slate-400">
              Total Income
            </p>
            <h2 className="mt-3 text-3xl font-black text-emerald-400">
              + ₹
              {totalIncome.toLocaleString("en-IN")}
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              {incomes.length} income entries
            </p>
          </motion.div>
          {/* Expenses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl border border-rose-500/20 bg-rose-500/10 p-6"
          >
            <p className="text-sm text-slate-400">
              Total Expenses
            </p>
            <h2 className="mt-3 text-3xl font-black text-rose-400">
              - ₹
              {totalExpenses.toLocaleString("en-IN")}
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              {expenses.length} expense entries
            </p>
          </motion.div>
          {/* Balance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl border border-violet-500/20 bg-violet-500/10 p-6"
          >
            <p className="text-sm text-slate-400">
              Current Balance
            </p>
            <h2
              className={`mt-3 text-3xl font-black ${
                balance >= 0
                  ? "text-violet-300"
                  : "text-red-400"
              }`}
            >
              ₹{balance.toLocaleString("en-IN")}
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              Income minus expenses
            </p>
          </motion.div>
        </div>
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-xl backdrop-blur-xl"
        >
          <div className="mb-5">
            <h2 className="text-xl font-black">
              Search & Filter
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Find a specific income or expense quickly.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {/* Search */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                placeholder="Food, Salary, Lunch..."
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20"
              />
            </div>
            {/* Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) =>
                  setTypeFilter(e.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-[#15151f] px-4 py-3 text-white outline-none focus:border-violet-400"
              >
                <option value="all">
                  All Transactions
                </option>

                <option value="income">
                  Income
                </option>

                <option value="expense">
                  Expense
                </option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Category
              </label>

              <select
                value={categoryFilter}
                onChange={(e) =>
                  setCategoryFilter(e.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-[#15151f] px-4 py-3 text-white outline-none focus:border-violet-400"
              >
                <option value="all">
                  All Categories
                </option>

                <option value="Food">Food</option>
                <option value="Travel">
                  Travel
                </option>
                <option value="Shopping">
                  Shopping
                </option>
                <option value="Entertainment">
                  Entertainment
                </option>
                <option value="Bills">Bills</option>
                <option value="Health">
                  Health
                </option>
                <option value="Education">
                  Education
                </option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-400">
              Showing{" "}
              <span className="font-bold text-white">
                {filteredTransactions.length}
              </span>{" "}
              of{" "}
              <span className="font-bold text-white">
                {transactions.length}
              </span>{" "}
              transactions
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              Clear Filters
            </button>
          </div>
        </motion.div>

        {/* Transaction History */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-2xl backdrop-blur-xl"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-black">
              All Transactions
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {filteredTransactions.length} matching transactions
            </p>
          </div>

          {/* No Transactions */}
          {transactions.length === 0 ? (
            <div className="py-16 text-center">
              <div className="text-5xl">📭</div>

              <h3 className="mt-5 text-xl font-bold">
                No transactions yet
              </h3>

              <p className="mt-2 text-slate-400">
                Add your first income or expense to get started.
              </p>

              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <motion.button
                  type="button"
                  onClick={() => setPage("income")}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white"
                >
                  + Add Income
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => setPage("dashboard")}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-xl bg-rose-600 px-6 py-3 font-bold text-white"
                >
                  + Add Expense
                </motion.button>
              </div>
            </div>
          ) : filteredTransactions.length === 0 ? (
            <div className="py-16 text-center">
              <div className="text-5xl">🔍</div>

              <h3 className="mt-5 text-xl font-bold">
                No matching transactions
              </h3>

              <p className="mt-2 text-slate-400">
                Try changing your search or filters.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-xl bg-violet-600 px-6 py-3 font-bold text-white hover:bg-violet-500"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTransactions.map(
                (transaction, index) => {
                  const isIncome =
                    transaction.type === "income";

                  return (
                    <motion.div
                      key={`${transaction.type}-${transaction.id}`}
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: Math.min(
                          index * 0.05,
                          0.5
                        ),
                      }}
                      whileHover={{
                        scale: 1.01,
                      }}
                      className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/20 p-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      {/* Left Side */}
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${
                            isIncome
                              ? "bg-emerald-500/15"
                              : "bg-rose-500/15"
                          }`}
                        >
                          {isIncome
                            ? "💰"
                            : "💸"}
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-bold text-white">
                              {isIncome
                                ? transaction.source
                                : transaction.category}
                            </h3>

                            <span
                              className={`rounded-full px-2 py-1 text-xs font-bold ${
                                isIncome
                                  ? "bg-emerald-500/15 text-emerald-400"
                                  : "bg-rose-500/15 text-rose-400"
                              }`}
                            >
                              {isIncome
                                ? "INCOME"
                                : "EXPENSE"}
                            </span>
                          </div>

                          {!isIncome && (
                            <p className="mt-1 text-sm text-slate-400">
                              {transaction.description}
                            </p>
                          )}

                          <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                            <span>
                              📅{" "}
                              {transaction.date}
                            </span>

                            {!isIncome &&
                              transaction.paymentMethod && (
                                <span>
                                  💳{" "}
                                  {
                                    transaction.paymentMethod
                                  }
                                </span>
                              )}
                          </div>
                        </div>
                      </div>

                      {/* Right Side */}
                      <div className="flex items-center gap-4 sm:justify-end">
                        <span
                          className={`text-xl font-black ${
                            isIncome
                              ? "text-emerald-400"
                              : "text-rose-400"
                          }`}
                        >
                          {isIncome
                            ? "+"
                            : "-"}{" "}
                          ₹
                          {Number(
                            transaction.amount
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </span>

                        <motion.button
                          type="button"
                          onClick={() => {
                            if (isIncome) {
                              handleDeleteIncome(
                                transaction.id
                              );
                            } else {
                              handleDeleteExpense(
                                transaction.id
                              );
                            }
                          }}
                          whileHover={{
                            scale: 1.05,
                          }}
                          whileTap={{
                            scale: 0.95,
                          }}
                          className="rounded-lg bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
                        >
                          Delete
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                }
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Transactions;