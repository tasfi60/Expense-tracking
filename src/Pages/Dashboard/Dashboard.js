import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/Authprovider";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [expense, setExpense] = useState([]);
  const [mainexpense, setMainexpense] = useState([]);

  const navigate = useNavigate();

  function handleNavigate(e) {
    navigate(`/Editexpense/${e}`);
  }
  function handleNavigatetoadd(e) {
    navigate(`/Addexpense/${e}`);
  }

  useEffect(() => {
    fetch(`http://localhost:5000/mainexpense?uid=${user.uid}`)
      .then((res) => res.json())
      .then((data) => {
        if (user.uid) {
          const exp = data.filter(
            (rev) => rev.uid === user.uid && !rev.is_deleted
          );
          setMainexpense(exp);
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Unable to fetch expenses");
      });
  }, [user?.uid]);

  useEffect(() => {
    if (!user?.uid) {
      setExpense([]);
      return;
    }

    fetch(`http://localhost:5000/expense?uid=${user.uid}`)
      .then((res) => res.json())
      .then((data) => {
        if (user.uid) {
          const exp = data.filter(
            (rev) => rev.uid === user.uid && !rev.is_deleted
          );
          setExpense(exp);
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Unable to fetch expenses");
      });
  }, [user?.uid]);

  const handleDelete = async (expenseId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (confirm) {
      try {
        await axios.delete(`http://localhost:5000/mainexpense/${expenseId}`);
        const updatedexpenses = expense.filter((exp) => exp._id !== expenseId);
        setMainexpense(updatedexpenses);
        alert("Expense deleted successfully");
      } catch (err) {
        console.error(err);
        alert("Unable to delete expense");
      }
    }
  };

  return (
    <div class="font-style my-4">
      <h3> Budget Plan</h3>
      <table class="table table-success table-striped">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Budget</th>
            <th scope="col">Expense Category</th>
            <th scope="col">Add Expense</th>
            <th scope="col">Edit Expense</th>
            <th scope="col">Delete Expense</th>
          </tr>
        </thead>
        <tbody>
          {expense.map((e, i) => (
            <tr key={e._id}>
              <th scope="row">{i + 1}</th>
              <td>
                {e.Budget} {e.Currency}
              </td>
              <td>{e.Category}</td>

              <td
                className="fs-2 BTN"
                onClick={() => handleNavigatetoadd(e._id)}
              >
                +
              </td>

              <td>
                <button
                  type="button"
                  onClick={() => handleNavigate(e._id)}
                  className="btn mt-5 BTN btn-md margin-b w-50 me-5 rounded"
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => handleDelete(e._id)}
                  className="form-button btn mt-5 BTN btn-md margin-b w-50 me-5 fs-6 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/settings" class="nav-style text-dark bg-white">
        Add More +
      </Link>
      <br />
      <hr />
      <h3>Expense & Budget Summary</h3>
      <table class="table table-success table-striped container w-50 mt-5 pt-5">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Expense Category</th>
            <th scope="col">Expense</th>
            <th scope="col">Budget</th>
          </tr>
        </thead>
        <tbody>
          {mainexpense.map((e, i) => (
            <tr key={e._id}>
              <th scope="row">{i + 1}</th>
              <td>{e.Category}</td>
              <td>
                {e.Expense} {e.Currency}
              </td>
              <td>
                {e.budget} {e.Currency}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div class="chart-container  mt-5 pt-5 font-style">
        <h2>EXPENSE & BUDGET BarChart</h2>
        <BarChart
          width={800}
          height={400}
          data={mainexpense}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Category" />
          <YAxis />
          <Legend />

          <Bar dataKey="budget" fill="#82ca9d" />
          <Bar dataKey="Expense" fill="#4E8AA4" />
        </BarChart>
      </div>
    </div>
  );
};

export default Dashboard;
