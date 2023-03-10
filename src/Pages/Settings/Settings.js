import React, { useContext } from "react";
import { AuthContext } from "../../Context/Authprovider";
import "./Settings.css";

const Settings = () => {
  const { user } = useContext(AuthContext);

  const handleAddBudget = (event) => {
    event.preventDefault();
    const form = event.target;
    const category = form.category.value;
    const currency = form.currency.value;
    const Budget = form.price.value;
    const date = form.date.value;
    const id = user.uid;
    const name = user.displayName;

    const expense = {
      Category: category,
      Currency: currency,
      Budget: Budget,
      Date: date,
      User: name,
      uid: id,
    };

    fetch("http://localhost:5000/expense", {
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
          alert("Plan Added to dashboard Successfully!");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <div class="max-width">
        <section class="expense turquoise">
          <div class="grid-full padded-reverse">
            <div class="grid-whole padded mt-2">
              <h3>Manage Your Expenses</h3>
              <hr />
            </div>
            <div class="grid-5 padded m-grid-whole s-grid-whole xs-grid-whole">
              <div class="grid-whole">
                <div class="dark-content-box payment-info">
                  <hr />
                  <div class="grid-3 s-grid-12 padded">
                    <p class="center">
                      <span class="icon-wallet icon-huge">
                        <img
                          src="https://cdni.iconscout.com/illustration/premium/thumb/expense-management-4268366-3561009.png"
                          alt="/"
                        />
                      </span>
                    </p>
                  </div>
                  <div class="grid-9 s-grid-12 padded">
                    <p>Add Your plan here.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="grid-7 padded m-grid-whole s-grid-whole xs-grid-whole">
              <form onSubmit={handleAddBudget} class="font-style">
                <label
                  for="option"
                  class="grid-whole padded fs-4 font-style fw-bold me-4"
                >
                  Expense Category:
                </label>
                <select id="option" class="p-1" name="category">
                  <option value="Housing and utilities">
                    Housing and utilities
                  </option>
                  <option value="Grocery">Grocery</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Personal care">Personal care</option>
                  <option value="Health and fitness">Health and fitness</option>
                  <option value="Education">Education </option>
                  <option value="Gifts and donations">
                    Gifts and donations
                  </option>
                  <option value="Travel">Travel </option>
                  <option value="Insurance">Insurance</option>
                  <option value="Taxes">Taxes</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Other">Other</option>
                </select>
                <br />
                <label
                  for="option"
                  class="grid-whole padded fs-4 font-style fw-bold me-4"
                >
                  Budget:
                </label>
                <select id="currency" name="currency">
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

                <label
                  for="date"
                  class="grid-whole padded fs-4 font-style fw-bold me-4"
                >
                  Date:
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  class="w-25 ms-3 border border-dark"
                  required
                />

                <br />
                <button
                  type="submit"
                  class="form-button button btn mt-5 btn-md w-25 fs-6 rounded "
                >
                  Make a Budget Plan
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
