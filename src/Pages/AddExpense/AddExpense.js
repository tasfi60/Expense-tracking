import React, { useContext, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Context/Authprovider";
import "./AddExpense.css";

const AddExpense = () => {
  const data = useLoaderData();

  const { user } = useContext(AuthContext);

  const handleAddExpense = (event) => {
    event.preventDefault();
    const form = event.target;
    const currency = form.currency.value;
    const Expense = form.price.value;
    const id = user.uid;
    const name = user.displayName;
    const category = data.Category;
    const budgetId = data._id;
    const budget = data.Budget;

    const expense = {
      Currency: currency,
      Expense: Expense,
      User: name,
      uid: id,
      Category: category,
      budgetId: budgetId,
      budget: budget,
    };

    fetch("http://localhost:5000/mainexpense", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(expense),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          form.reset();
          alert("Expense Added Successfully!");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <div class="max-width my-5 font-style">
        <h3>Add Your Expense here</h3>
      </div>

      <form onSubmit={handleAddExpense} class="font-style">
        <br />
        <label
          for="option"
          class="grid-whole padded fs-4 font-style fw-bold me-4"
        >
          Expense:
        </label>
        <select id="currency" name="currency" required>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="INR">INR</option>
          <option value="GBP">GBP</option>
          <option value="BDT">BDT</option>
        </select>
        <input
          type="number"
          id="price"
          name="price"
          min="1.00"
          step="1"
          class="w-25 ms-3 border border-dark"
          required
        />
        <br />

        <br />
        <div class="buttons mx-auto">
          <button
            type="submit"
            class="form-button btn mt-3 btn-md margin-b w-25  fs-6 rounded fs-6"
          >
            <small>ADD EXPENSE</small>
          </button>
          <button class="form-button btn mt-3 btn-md margin-b w-25 px-4 fs-6 rounded fs-6">
            <small>
              <Link class="nav-style   " to="/dashboard">
                Go Back
              </Link>
            </small>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;
