<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header" class="row">
            <div class="col">
              <div class="row">
                <div class="col-10 title-col">
                  <h3>Edit Your Budget</h3>
                </div>
                <div class="col-2 btn-col">
                  <button type="button" class="btn-close" @click="close" aria-label="Close modal">x</button>
                </div>
              </div>
              <div class="row">
                <div class="col-10 sub1">Make sure Total: 0</div>
                <div class="col-2 sub2">
                  <h5>Total: {{remainder}}</h5>
                </div>
              </div>
            </div>
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body" class="form__group field">
            <div class="row">
              <div class="col-6 label">
                <label for="income">Income</label>
              </div>
              <div class="col-6">
                <input type="number" id="income" for="income" required v-model="newBudget.income" />
              </div>
            </div>
            <div class="row">
              <div class="col-6 label">
                <label for="housing">Housing</label>
              </div>
              <div class="col-6">
                <input
                  type="number"
                  id="housing"
                  for="housing"
                  required
                  v-model="newBudget.housing"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-6 label">
                <label for="transportation">Transportation</label>
              </div>
              <div class="col-6">
                <input
                  type="number"
                  id="transportation"
                  for="transportation"
                  required
                  v-model="newBudget.trans"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-6 label">
                <label for="food">Food</label>
              </div>
              <div class="col-6">
                <input type="number" id="food" for="food" required v-model="newBudget.food" />
              </div>
            </div>
            <div class="row">
              <div class="col-6 label">
                <label for="utilities">Utilities</label>
              </div>
              <div class="col-6">
                <input
                  type="number"
                  id="utilities"
                  for="utilities"
                  required
                  v-model="newBudget.utils"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-6 label">
                <label for="insurance">Insurance</label>
              </div>
              <div class="col-6">
                <input
                  type="number"
                  id="insurance"
                  for="insurance"
                  required
                  v-model="newBudget.insurance"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-6 label">
                <label for="medical">Medical</label>
              </div>
              <div class="col-6">
                <input
                  type="number"
                  id="medical"
                  for="medical"
                  required
                  v-model="newBudget.medical"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-6 label">
                <label for="savings">Savings</label>
              </div>
              <div class="col-6">
                <input
                  type="number"
                  id="savings"
                  for="savings"
                  required
                  v-model="newBudget.savings"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-6 label">
                <label for="investing">Investing</label>
              </div>
              <div class="col-6">
                <input
                  type="number"
                  id="investing"
                  for="investing"
                  required
                  v-model="newBudget.invest"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-6 label">
                <label for="debt">Debt Payments</label>
              </div>
              <div class="col-6">
                <input type="number" id="debt" for="debt" required v-model="newBudget.debtPay" />
              </div>
            </div>
            <div class="row">
              <div class="col-6 label">
                <label for="rec">Recreation/Entertainment</label>
              </div>
              <div class="col-6">
                <input type="number" id="rec" for="rec" required v-model="newBudget.recEnt" />
              </div>
            </div>
            <div class="row">
              <div class="col-6 label">
                <label for="misc">Miscellaneous</label>
              </div>
              <div class="col-6">
                <input type="number" id="misc" for="misc" required v-model="newBudget.misc" />
              </div>
            </div>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button
              type="button"
              class="btn-green"
              @click.prevent="editBudget"
              aria-label="Submit"
            >Submit</button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "editmodal",
  props: ["bData", "uData"],
  data() {
    return {
      newBudget: {
        income: this.bData.income,
        housing: this.bData.housing,
        trans: this.bData.trans,
        food: this.bData.food,
        utils: this.bData.utils,
        insurance: this.bData.insurance,
        medical: this.bData.medical,
        savings: this.bData.savings,
        invest: this.bData.invest,
        debtPay: this.bData.debtPay,
        recEnt: this.bData.recEnt,
        misc: this.bData.misc
      }
    };
  },
  computed: {
    remainder() {
      let total = this.newBudget;
      return (
        Number(total.income) -
        (Number(total.housing) +
          Number(total.trans) +
          Number(total.food) +
          Number(total.utils) +
          Number(total.insurance) +
          Number(total.medical) +
          Number(total.savings) +
          Number(total.invest) +
          Number(total.debtPay) +
          Number(total.recEnt) +
          Number(total.misc))
      );
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    editBudget() {
      let budget = { ...this.newBudget };
      let income = budget.income;
      let sum = 0 - income;
      for (let key in budget) {
        if (budget.hasOwnProperty(key)) {
          sum += Number(budget[key]);
        }
      }
      if (sum != income) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Income and expenses must be equal."
        });
      } else {
        budget._id = this.uData._id;
        this.$store.dispatch("editBudget", budget);
        this.close();
      }
    }
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  width: 50%;
  height: auto;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
}

.modal-header,
.modal-footer {
  padding: 5px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 0px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-close:hover {
  color: #56dac1;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
  cursor: pointer;
}

.btn-green:hover {
  background: #56dac1;
  border: 1px solid #56dac1;
}

.btn-col {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  margin-left: -9%;
}

input[type="number"] {
  max-width: 300px;
  text-align: -webkit-right;
  border-top-style: none;
  border-bottom-style: solid;
  border-right-style: none;
  border-left-style: none;
  border-color: #4aae9b;
}

input[type="number"]:hover {
  border-color: #56dac1;
}
.label {
  text-align: -webkit-auto;
}

.col-6 {
  width: 95%;
}

.sub1 {
  text-align: left;
}

.title-col {
  margin-left: 8%;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input:focus {
  outline: none !important;
}
</style>
