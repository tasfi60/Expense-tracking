import React, { useContext, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Context/Authprovider";
import "./EditExpense.css";

const EditExpense = () => {
  const { user } = useContext(AuthContext);
  const update = useLoaderData();
  console.log(update);

  const [newExpense, setNewExpense] = useState(update);

  const handleInputChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    const updatedExpense = { ...newExpense };
    updatedExpense[field] = value;
    setNewExpense(updatedExpense);
  };

  const handleUpdateExpense = (event) => {
    event.preventDefault();

    console.log(newExpense);
    fetch(`http://localhost:5000/mainexpense/${update.budgetId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newExpense),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("Edited Successfully!");
          console.log(data);
          event.target.reset();
        }
      });
  };

  return (
    <div>
      <form onSubmit={handleUpdateExpense} class="font-style mt-5">
        <label
          for="option"
          class="grid-whole padded fs-4 font-style fw-bold me-4"
        >
          Expense Category:
        </label>
        <input
          class="fs-5 mx-auto w-25"
          name="category"
          defaultValue={update.Category}
          disabled
        />

        <br />
        <label
          for="option"
          class="grid-whole padded fs-4 font-style fw-bold me-4"
        >
          Expense:
        </label>
        <input
          type="number"
          id="price"
          name="price"
          onChange={handleInputChange}
          defaultValue={update.Price}
          min="1.00"
          step="1"
          class="w-25 h-25 ms-3 border border-dark"
          required
        />
        <br />

        <br />
        <div class="buttons mx-auto">
          <button
            type="submit"
            class="form-button btn mt-3 btn-md margin-b w-25  fs-6 rounded fs-6"
          >
            <small>Save changes</small>
          </button>
          <button class="form-button btn mt-3 btn-md margin-b w-25 px-4 fs-6 rounded fs-6">
            <small>
              <Link class="nav-style  " to="/dashboard">
                Go Back
              </Link>
            </small>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditExpense;
