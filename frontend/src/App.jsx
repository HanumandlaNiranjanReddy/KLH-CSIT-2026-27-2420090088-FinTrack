import { useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Income from "./components/Income";
import Transactions from "./components/Transactions";
import Analysis from "./components/Analysis";

function App() {
  // PAGE STATE
  const [page, setPage] = useState("login");

  // LOGIN STATE
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // REGISTER STATE
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  // EXPENSE STATE
  const [expenses, setExpenses] = useState([]);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("Food");
  const [expenseDate, setExpenseDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [expenseDescription, setExpenseDescription] = useState("");

  // INCOME STATE
  const [incomes, setIncomes] = useState([]);

  // LOGIN WITH JWT
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoginError("");

    if (!username.trim() || !password.trim()) {
      setLoginError("Please enter username and password.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: username.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setLoginError("Incorrect username or password.");
        return;
      }

      localStorage.setItem(
        "fintrack_token",
        data.token
      );

      localStorage.setItem(
        "fintrack_user",
        JSON.stringify(data.user)
      );

      setUsername(data.user.name);
      setPassword("");
      setLoginError("");
      setLoggedIn(true);
      setPage("dashboard");
    } catch (error) {
      console.error("Login error:", error);

      setLoginError(
        "Unable to connect to the server."
      );
    }
  };

  // LOAD INCOME FROM DATABASE
  const loadIncome = async () => {
    const token = localStorage.getItem(
      "fintrack_token"
    );

    if (!token) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/income",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(
          "Failed to load income:",
          data.message
        );
        return;
      }

      const formattedIncome = data.map(
        (income) => ({
          id: income.id,
          type: "income",
          source: income.source,
          amount: Number(income.amount),
          date: income.date,
        })
      );

      setIncomes(formattedIncome);
    } catch (error) {
      console.error(
        "Load income error:",
        error
      );
    }
  };

  // LOAD EXPENSES FROM DATABASE
  const loadExpenses = async () => {
    const token = localStorage.getItem(
      "fintrack_token"
    );

    if (!token) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/expenses",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(
          "Failed to load expenses:",
          data.message
        );
        return;
      }

      const formattedExpenses = data.map(
        (expense) => ({
          id: expense.id,
          type: "expense",
          amount: Number(expense.amount),
          category: expense.category,
          date: expense.date,
          paymentMethod:
            expense.payment_method,
          description:
            expense.description ||
            "No description",
        })
      );

      setExpenses(formattedExpenses);
    } catch (error) {
      console.error(
        "Load expenses error:",
        error
      );
    }
  };

  // REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !registerPassword.trim()
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: `${firstName.trim()} ${lastName.trim()}`,
            email: email.trim(),
            password: registerPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 409) {
        alert(
          "This email is already registered. Please sign in."
        );

        setPage("login");
        setUsername(email.trim());
        setPassword("");
        setLoginError("");

        return;
      }

      if (!response.ok) {
        alert(
          data.message ||
            "Registration failed."
        );
        return;
      }

      setFirstName("");
      setLastName("");
      setEmail("");
      setRegisterPassword("");

      setPage("login");
      setLoginError("");
    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      alert(
        "Cannot connect to the backend. Make sure your backend is running."
      );
    }
  };

  // ADD EXPENSE TO DATABASE
  const handleAddExpense = async (e) => {
    e.preventDefault();

    if (
      !expenseAmount ||
      Number(expenseAmount) <= 0
    ) {
      alert(
        "Please enter a valid expense amount."
      );
      return;
    }

    if (!expenseDate) {
      alert("Please select a date.");
      return;
    }

    const token = localStorage.getItem(
      "fintrack_token"
    );

    if (!token) {
      alert("Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/expenses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: Number(expenseAmount),
            category: expenseCategory,
            date: expenseDate,
            paymentMethod: paymentMethod,
            description:
              expenseDescription.trim() ||
              "No description",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to add expense."
        );
        return;
      }

      const newExpense = {
        id: data.id,
        type: "expense",
        amount: Number(data.amount),
        category: data.category,
        date: data.date,
        paymentMethod:
          data.payment_method,
        description:
          data.description ||
          "No description",
      };

      setExpenses((previousExpenses) => [
        newExpense,
        ...previousExpenses,
      ]);

      setExpenseAmount("");
      setExpenseCategory("Food");
      setExpenseDate("");
      setPaymentMethod("Cash");
      setExpenseDescription("");
      setShowExpenseForm(false);
    } catch (error) {
      console.error(
        "Add expense error:",
        error
      );

      alert(
        "Unable to connect to the backend."
      );
    }
  };

  // DELETE EXPENSE FROM DATABASE
  const handleDeleteExpense = async (id) => {
    const token = localStorage.getItem(
      "fintrack_token"
    );

    if (!token) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/expenses/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to delete expense."
        );
        return;
      }

      setExpenses((previousExpenses) =>
        previousExpenses.filter(
          (expense) => expense.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Delete expense error:",
        error
      );

      alert(
        "Unable to connect to the backend."
      );
    }
  };

  // ADD INCOME TO DATABASE
  const handleAddIncome = async (income) => {
    const token = localStorage.getItem(
      "fintrack_token"
    );

    if (!token) {
      alert("Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/income",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            source: income.source,
            amount: Number(income.amount),
            date: income.date,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to add income."
        );
        return;
      }

      const newIncome = {
        id: data.id,
        type: "income",
        source: data.source,
        amount: Number(data.amount),
        date: data.date,
      };

      setIncomes((previousIncomes) => [
        newIncome,
        ...previousIncomes,
      ]);
    } catch (error) {
      console.error(
        "Add income error:",
        error
      );

      alert(
        "Unable to connect to the backend."
      );
    }
  };

  // DELETE INCOME
  const handleDeleteIncome = async (id) => {
    const token = localStorage.getItem(
      "fintrack_token"
    );

    if (!token) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/income/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        alert(
          data.message ||
            "Failed to delete income."
        );
        return;
      }
      setIncomes((previousIncomes) =>
        previousIncomes.filter(
          (income) => income.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Delete income error:",
        error
      );
      alert(
        "Unable to connect to the backend."
      );
    }
  };
  // LOAD DATABASE DATA AFTER LOGIN
  useEffect(() => {
    if (loggedIn) {
      loadIncome();
      loadExpenses();
    }
  }, [loggedIn]);
  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem(
      "fintrack_token"
    );
    localStorage.removeItem(
      "fintrack_user"
    );
    setLoggedIn(false);
    setPage("login");
    setUsername("");
    setPassword("");
    setLoginError("");
    setExpenses([]);
    setIncomes([]);
  };
  // TOTAL EXPENSES
  const totalExpenses = expenses.reduce(
    (total, expense) =>
      total + Number(expense.amount),
    0
  );
  // TOTAL INCOME
  const totalIncome = incomes.reduce(
    (total, income) =>
      total + Number(income.amount),
    0
  );

  // LOGIN PAGE
  if (!loggedIn && page === "login") {
    return (
      <Login
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        setPage={setPage}
        loginError={loginError}
      />
    );
  }

  // REGISTER PAGE
  if (
    !loggedIn &&
    page === "register"
  ) {
    return (
      <Register
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        email={email}
        setEmail={setEmail}
        registerPassword={registerPassword}
        setRegisterPassword={
          setRegisterPassword
        }
        handleRegister={handleRegister}
        setPage={setPage}
      />
    );
  }

  // DASHBOARD PAGE
  if (
    loggedIn &&
    page === "dashboard"
  ) {
    return (
      <Dashboard
        username={username}
        totalExpenses={totalExpenses}
        totalIncome={totalIncome}
        expenses={expenses}
        incomes={incomes}
        showExpenseForm={
          showExpenseForm
        }
        setShowExpenseForm={
          setShowExpenseForm
        }
        expenseAmount={expenseAmount}
        setExpenseAmount={
          setExpenseAmount
        }
        expenseCategory={
          expenseCategory
        }
        setExpenseCategory={
          setExpenseCategory
        }
        expenseDate={expenseDate}
        setExpenseDate={
          setExpenseDate
        }
        paymentMethod={
          paymentMethod
        }
        setPaymentMethod={
          setPaymentMethod
        }
        expenseDescription={
          expenseDescription
        }
        setExpenseDescription={
          setExpenseDescription
        }
        handleAddExpense={
          handleAddExpense
        }
        handleDeleteExpense={
          handleDeleteExpense
        }
        handleLogout={handleLogout}
        setPage={setPage}
      />
    );
  }

  // INCOME PAGE
  if (
    loggedIn &&
    page === "income"
  ) {
    return (
      <Income
        incomes={incomes}
        totalIncome={totalIncome}
        handleAddIncome={
          handleAddIncome
        }
        handleDeleteIncome={
          handleDeleteIncome
        }
        setPage={setPage}
      />
    );
  }

  // TRANSACTIONS PAGE
  if (
    loggedIn &&
    page === "transactions"
  ) {
    return (
      <Transactions
        expenses={expenses}
        incomes={incomes}
        totalExpenses={
          totalExpenses
        }
        totalIncome={
          totalIncome
        }
        handleDeleteExpense={
          handleDeleteExpense
        }
        handleDeleteIncome={
          handleDeleteIncome
        }
        setPage={setPage}
      />
    );
  }
  // ANALYSIS PAGE
  if (
    loggedIn &&
    page === "analysis"
  ) {
    return (
      <Analysis
        incomes={incomes}
        expenses={expenses}
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        setPage={setPage}
      />
    );
  }
  return null;
}
export default App;