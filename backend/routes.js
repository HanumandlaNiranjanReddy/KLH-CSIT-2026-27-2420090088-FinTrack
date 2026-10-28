const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("./db");
const router = express.Router();
const JWT_SECRET =
  process.env.JWT_SECRET ||
  "fintrack_secret_key_123";
// JWT AUTHENTICATION MIDDLEWARE
const authenticateToken = (
  req,
  res,
  next
) => {
  const authHeader =
    req.headers.authorization;
  const token =
    authHeader &&
    authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;
  if (!token) {
    return res.status(401).json({
      message: "Access token required.",
    });
  }
  try {
    const decoded = jwt.verify(
      token,
      JWT_SECRET
    );
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token.",
    });
  }
};
// TEST DATABASE
// GET /api/test-db
router.get(
  "/test-db",
  async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT NOW() AS time"
      );
      res.json({
        message:
          "PostgreSQL connected successfully!",
        time: result.rows[0].time,
      });
    } catch (error) {
      console.error(
        "Database test error:",
        error
      );
      res.status(500).json({
        message:
          "PostgreSQL connection failed.",
      });
    }
  }
);
// REGISTER
// POST /api/register
router.post(
  "/register",
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
      } = req.body;
      if (
        !name ||
        !email ||
        !password
      ) {
        return res.status(400).json({
          message:
            "Please fill in all fields.",
        });
      }
      const cleanName = name.trim();
      const cleanEmail = email
        .trim()
        .toLowerCase();
      // Check duplicate email
      const existingUser =
        await pool.query(
          "SELECT id FROM users WHERE email = $1",
          [cleanEmail]
        );
      if (
        existingUser.rows.length > 0
      ) {
        return res.status(409).json({
          message:
            "This email is already registered. Please sign in.",
        });
      }
      // Hash password
      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );
      // Insert user
      const result =
        await pool.query(
          `INSERT INTO users
            (name, email, password)
           VALUES ($1, $2, $3)
           RETURNING id, name, email, created_at`,
          [
            cleanName,
            cleanEmail,
            hashedPassword,
          ]
        );
      res.status(201).json({
        message:
          "Account created successfully.",
        user: result.rows[0],
      });
    } catch (error) {
      console.error(
        "Registration error:",
        error
      );
      if (error.code === "23505") {
        return res.status(409).json({
          message:
            "This email is already registered. Please sign in.",
        });
      }
      res.status(500).json({
        message:
          "Server error during registration.",
      });
    }
  }
);
// LOGIN
// POST /api/login
router.post(
  "/login",
  async (req, res) => {
    try {
      const {
        email,
        password,
      } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          message:
            "Email and password are required.",
        });
    }
      const cleanEmail =
        email.trim().toLowerCase();
      // Find user
      const result =
        await pool.query(
          `SELECT
             id,
             name,
             email,
             password
           FROM users
           WHERE email = $1`,
          [cleanEmail]
        );
      if (
        result.rows.length === 0
      ) {
        return res.status(401).json({
          message:
            "Incorrect username or password.",
        });
      }
      const user = result.rows[0];
      // Compare password
      const passwordMatch =
        await bcrypt.compare(
          password,
          user.password
        );
      if (!passwordMatch) {
        return res.status(401).json({
          message:
            "Incorrect username or password.",
        });
      }
      // Generate JWT
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      res.json({
        message:
          "Login successful.",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error(
        "Login error:",
        error
    );
      res.status(500).json({
        message:
          "Server error during login.",
      });
    }
  }
);
// CURRENT USER
// GET /api/me
router.get(
  "/me",
  authenticateToken,
  async (req, res) => {
    try {
      const result =
        await pool.query(
          `SELECT
             id,
             name,
             email,
             created_at
           FROM users
           WHERE id = $1`,
          [req.user.id]
        );
      if (
        result.rows.length === 0
      ) {
        return res.status(404).json({
          message:
            "User not found.",
        });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error(
        "Get current user error:",
        error
      );
      res.status(500).json({
        message:
          "Server error while loading user.",
      });
    }
  }
);
// GET ALL USERS
// GET /api/users
router.get(
  "/users",
  async (req, res) => {
    try {
      const result =
        await pool.query(
          `SELECT
             id,
             name,
             email,
             created_at
           FROM users
           ORDER BY id ASC`
        );
      res.json(result.rows);
    } catch (error) {
      console.error(
        "Get users error:",
        error
      );
      res.status(500).json({
        message:
          "Server error while loading users.",
      });
    }}
);
// CREATE USER
// POST /api/users
router.post(
  "/users",
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
      } = req.body;
      if (
        !name ||
        !email ||
        !password
      ) {
        return res.status(400).json({
          message:
            "All fields are required.",
        });
      }
      const cleanEmail =
        email.trim().toLowerCase();
      const existingUser =
        await pool.query(
          "SELECT id FROM users WHERE email = $1",
          [cleanEmail]
        );
      if (
        existingUser.rows.length > 0
      ) {
        return res.status(409).json({
          message:
            "This email is already registered.",
        });
      }
      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );
      const result =
        await pool.query(
          `INSERT INTO users
            (name, email, password)
           VALUES ($1, $2, $3)
           RETURNING
             id,
             name,
             email,
             created_at`,
          [
            name.trim(),
            cleanEmail,
            hashedPassword,
          ]
        );
      res.status(201).json(
        result.rows[0]
      );
    } catch (error) {
      console.error(
        "Create user error:",
        error
      );
      res.status(500).json({
        message:
          "Server error while creating user.",
      });
    }
  }
);
// INCOME
// GET INCOME
// GET /api/income
router.get(
  "/income",
  authenticateToken,
  async (req, res) => {
    try {
      const result =
        await pool.query(
          `SELECT
             id,
             source,
             amount,
             date,
             created_at
           FROM income
           WHERE user_id = $1
           ORDER BY date DESC, id DESC`,
          [req.user.id]
        );
      res.json(result.rows);
    } catch (error) {
      console.error(
        "Get income error:",
        error
      );
      res.status(500).json({
        message:
          "Server error while loading income.",
      });
    }
  }
);
// ADD INCOME
// POST /api/income
router.post(
  "/income",
  authenticateToken,
  async (req, res) => {
    try {
      const {
        source,
        amount,
        date,
      } = req.body;
      if (
        !source ||
        amount === undefined ||
        !date
      ) {
        return res.status(400).json({
          message:
            "Source, amount and date are required.",
        });
      }
      if (
        Number(amount) <= 0
      ) {
        return res.status(400).json({
          message:
            "Amount must be greater than zero.",
        });
      }
      const result =
        await pool.query(
          `INSERT INTO income
            (
              user_id,
              source,
              amount,
              date
            )
           VALUES ($1, $2, $3, $4)
           RETURNING
             id,
             source,
             amount,
             date,
             created_at`,
          [
            req.user.id,
            source.trim(),
            Number(amount),
            date,
          ]
        );
      res.status(201).json(
        result.rows[0]
      );
    } catch (error) {
      console.error(
        "Add income error:",
        error
      );
      res.status(500).json({
        message:
          "Server error while adding income.",
      });}
  }
);
// DELETE INCOME
// DELETE /api/income/:id
router.delete(
  "/income/:id",
  authenticateToken,
  async (req, res) => {
    try {
      const { id } = req.params;
      const result =
        await pool.query(
          `DELETE FROM income
           WHERE id = $1
           AND user_id = $2
           RETURNING id`,
          [
            id,
            req.user.id,
          ]
        );
      if (
        result.rows.length === 0
      ) {
        return res.status(404).json({
          message:
            "Income not found.",
        });
      }
      res.json({
        message:
          "Income deleted successfully.",
      });
    } catch (error) {
      console.error(
        "Delete income error:",
        error
      );
      res.status(500).json({
        message:
          "Server error while deleting income.",
      });}
  }
);
// EXPENSES
// GET EXPENSES
// GET /api/expenses
router.get(
  "/expenses",
  authenticateToken,
  async (req, res) => {
    try {
      const result =
        await pool.query(
          `SELECT
             id,
             amount,
             category,
             date,
             payment_method,
             description,
             created_at
           FROM expenses
           WHERE user_id = $1
           ORDER BY date DESC, id DESC`,
          [req.user.id]
        );
      res.json(result.rows);
    } catch (error) {
      console.error(
        "Get expenses error:",
        error
      );
      res.status(500).json({
        message:
          "Server error while loading expenses.",
      });
    }
  }
);
// ADD EXPENSE
// POST /api/expenses
router.post(
  "/expenses",
  authenticateToken,
  async (req, res) => {
    try {
      const {
        amount,
        category,
        date,
        paymentMethod,
        description,
      } = req.body;
      if (
        amount === undefined ||
        !category ||
        !date ||
        !paymentMethod
      ) {
        return res.status(400).json({
          message:
            "Amount, category, date and payment method are required.",
        });
      }
      if (
        Number(amount) <= 0
      ) {
        return res.status(400).json({
          message:
            "Amount must be greater than zero.",
        });
      }
      const result =
        await pool.query(
          `INSERT INTO expenses
            (
              user_id,
              amount,
              category,
              date,
              payment_method,
              description
            )
           VALUES
            ($1, $2, $3, $4, $5, $6)
           RETURNING
             id,
             amount,
             category,
             date,
             payment_method,
             description,
             created_at`,
          [
            req.user.id,
            Number(amount),
            category.trim(),
            date,
            paymentMethod.trim(),
            description
              ? description.trim()
              : null,
          ]
        );
      res.status(201).json(
        result.rows[0]
      );
    } catch (error) {
      console.error(
        "Add expense error:",
        error
      );
      res.status(500).json({
        message:
          "Server error while adding expense.",
      });}}
);
// DELETE EXPENSE
// DELETE /api/expenses/:id
router.delete(
  "/expenses/:id",
  authenticateToken,
  async (req, res) => {
    try {
      const { id } = req.params;
      const result =
        await pool.query(
          `DELETE FROM expenses
           WHERE id = $1
           AND user_id = $2
           RETURNING id`,
          [
            id,
            req.user.id,
          ]
        );
      if (
        result.rows.length === 0
      ) {
        return res.status(404).json({
          message:
            "Expense not found.",
        });
      }
      res.json({
        message:
          "Expense deleted successfully.",
      });
    } catch (error) {
      console.error(
        "Delete expense error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while deleting expense.",
      });
    }
  }
);
// EXPORT ROUTER
module.exports = router;