import React from 'react';
import './Settings.css';

const Settings = () => {
    return (
        <div>
            <div>
    <div class="max-width">
      <section class="payment turquoise">
        <div class="grid-full padded-reverse">
          <div class="grid-whole padded">
            <h3>Manage Your Expenses</h3>
            <hr/>
          </div>
          <div class="grid-5 padded m-grid-whole s-grid-whole xs-grid-whole">
            <div class="grid-whole">
              <div class="dark-content-box payment-info">
               
                <hr/>
                <div class="grid-3 s-grid-12 padded">
                  <p class="center">
                    <span class="icon-wallet icon-huge">
                    <img src="http://www.thisisstar.com/images/100UI/002/wallet.svg"/>
                    </span>
                  </p>
                </div>
                <div class="grid-9 s-grid-12 padded">
                  <p>
                    You don't currently have a card on file. Add one here.
                  </p>
                </div>
                <div class="clear"></div>
                <div class="cards">
                  <h6 class="upper-bryant micro">accepted payment types</h6>
                  <p>
                    <span class="pf pf-visa"></span> <span class="pf pf-mastercard"></span> <span class="pf pf-american-express"></span> <span class="pf pf-jcb"></span> <span class="pf pf-discover"></span> <span class="pf pf-diners"></span>
                  </p>
                  <div class="clear"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="grid-7 padded m-grid-whole s-grid-whole xs-grid-whole">
            <form id="payment-form" action="/cards" accept-charset="UTF-8" method="post">
              <input name="utf8" type="hidden" value="✓"/>
              <div class="grid-whole">
                <label for="card-number">
                  <span class="upper-bryant small-bold">Card Number</span>
                </label>
                <input type="number" class="space" size="20" name="card-number" id="card-number"/>
              </div>
              <div class="grid-whole padded-reverse">
                <div class="grid-5 padded">
                  <div class="grid-5">
                    <label for="cvc">
                      <span class="upper-bryant small-bold">CVC</span>
                      <input type="number" class="space" size="4" name="cvc" id="cvc"/>
                    </label>
                  </div>
                  <div class="grid-7 cvc-box center">
                    <img class="cvc" src="http://www.thisisstar.com/images/100UI/002/cvc_opt.svg"/>
                  </div>
                </div>
                <div class="grid-7 padded">
                  <div class="grid-whole">
                    <span class="upper-bryant small-bold">
                <label for="exp-month">
                  Expiration
                </label>
              </span>
                    <span class="upper-bryant micro">
                <label for="exp-year">
                  (MM/YYYY)
                </label>
              </span>
                  </div>
                  <div class="grid-4">
                    <input type="number" class="space" size="2" data-stripe="exp-month" id="exp-month"/>
                  </div>
                  <div class="grid-2 center huge valign-dollar">
                    <span class="upper-bryant tall-slash"> / </span>
                  </div>
                  <div class="grid-6">
                    <input type="number" class="space" size="4" id="exp-year"/>
                  </div>
                </div>
              </div>
              <button type="submit" class="btn" id="update-payment">Update Card</button>
            </form>
          </div>
          <div class="clear"></div>
        </div>
      </section>
    </div>
  </div>
        </div>
    );
};

export default Settings;