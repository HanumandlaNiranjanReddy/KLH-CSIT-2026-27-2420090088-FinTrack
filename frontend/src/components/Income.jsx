import { useState } from "react";
import { motion } from "motion/react";

function Income({
  incomes = [],
  totalIncome,
  handleAddIncome,
  handleDeleteIncome,
  setPage,
}) {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const calculatedTotalIncome = incomes.reduce(
    (total, income) =>
      total + Number(income.amount),
    0
  );

  const displayTotalIncome =
    totalIncome !== undefined
      ? totalIncome
      : calculatedTotalIncome;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!source.trim()) {
      alert("Please enter income source.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (!date) {
      alert("Please select a date.");
      return;
    }

    handleAddIncome({
      source: source.trim(),
      amount: Number(amount),
      date,
    });

    setSource("");
    setAmount("");
    setDate("");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl">

        <button
          type="button"
          onClick={() => setPage("dashboard")}
          className="mb-6 rounded-lg bg-slate-800 px-5 py-2.5 font-medium text-white transition hover:bg-slate-700"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-4xl font-black text-slate-900">
          Income
        </h1>

        <p className="mt-2 text-lg text-slate-500">
          Manage and track your income
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 rounded-3xl bg-gradient-to-r from-emerald-500 to-emerald-700 p-8 text-white shadow-xl"
        >
          <p className="text-lg text-white/80">
            Total Income
          </p>

          <h2 className="mt-3 text-5xl font-black">
            ₹
            {displayTotalIncome.toLocaleString(
              "en-IN"
            )}
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">

          {/* ADD INCOME */}
          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900">
              Add Income
            </h2>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
            >
              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Income Source
                </label>

                <input
                  type="text"
                  value={source}
                  onChange={(e) =>
                    setSource(e.target.value)
                  }
                  placeholder="Salary, Freelance, Business..."
                  className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Amount
                </label>

                <input
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value)
                  }
                  placeholder="Enter amount"
                  className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Date
                </label>

                <input
                  type="date"
                  value={date}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-emerald-600 py-4 font-bold text-white hover:bg-emerald-700"
              >
                + Add Income
              </button>
            </form>
          </div>

          {/* INCOME HISTORY */}
          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900">
              Income History
            </h2>

            {incomes.length === 0 ? (
              <div className="flex min-h-[350px] items-center justify-center">
                <p className="text-slate-400">
                  No income added yet
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {incomes.map((income) => (
                  <motion.div
                    key={income.id}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 p-5"
                  >
                    <div>
                      <h3 className="font-bold text-slate-800">
                        {income.source}
                      </h3>

                      <p className="mt-1 text-sm text-slate-400">
                        {income.date}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-emerald-600">
                        + ₹
                        {Number(
                          income.amount
                        ).toLocaleString("en-IN")}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteIncome(
                            income.id
                          )
                        }
                        className="mt-2 text-sm text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Income;