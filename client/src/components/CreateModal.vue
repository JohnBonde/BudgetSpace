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
          <slot name="header">
            Enter Your Budget
            <button
              type="button"
              class="btn-close"
              @click="close"
              aria-label="Close modal"
            >
              x
            </button>
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <label for="income">Income</label>
            <input
              type="number"
              id="income"
              for="income"
              required
              v-model="newBudget.income"
            />
            <label for="housing">Housing</label>
            <input
              type="number"
              id="housing"
              for="housing"
              required
              v-model="newBudget.housing"
            />
            <label for="transportation">Transportation</label>
            <input
              type="number"
              id="transportation"
              for="transportation"
              required
              v-model="newBudget.trans"
            />
            <label for="food">Food</label>
            <input
              type="number"
              id="food"
              for="food"
              required
              v-model="newBudget.food"
            />
            <label for="utilities">Utilities</label>
            <input
              type="number"
              id="utilities"
              for="utilities"
              required
              v-model="newBudget.utils"
            />
            <label for="insurance">Insurance</label>
            <input
              type="number"
              id="insurance"
              for="insurance"
              required
              v-model="newBudget.insurance"
            />
            <label for="medical">Medical</label>
            <input
              type="number"
              id="medical"
              for="medical"
              required
              v-model="newBudget.medical"
            />
            <label for="savings">Savings</label>
            <input
              type="number"
              id="savings"
              for="savings"
              required
              v-model="newBudget.savings"
            />
            <label for="investing">Investing</label>
            <input
              type="number"
              id="investing"
              for="investing"
              required
              v-model="newBudget.invest"
            />
            <label for="debt">Debt Payments</label>
            <input
              type="number"
              id="debt"
              for="debt"
              required
              v-model="newBudget.debtPay"
            />
            <label for="rec">Recreation/Entertainment</label>
            <input
              type="number"
              id="rec"
              for="rec"
              required
              v-model="newBudget.recEnt"
            />
            <label for="misc">Miscellaneous</label>
            <input
              type="number"
              id="misc"
              for="misc"
              required
              v-model="newBudget.misc"
            />
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            I'm the default footer!
            <button
              type="button"
              class="btn btn-success"
              @click.prevent="createBudget"
              aria-label="Submit"
            >
              Submit
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "modal",
  data() {
    return {
      newBudget: {
        income: 0,
        housing: 0,
        trans: 0,
        food: 0,
        utils: 0,
        insurance: 0,
        medical: 0,
        savings: 0,
        invest: 0,
        debtPay: 0,
        recEnt: 0,
        misc: 0
      }
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    createBudget() {
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
        this.$store.dispatch("createBudget", budget);
        this.newBudget = {
          income: 0,
          housing: 0,
          trans: 0,
          food: 0,
          utils: 0,
          insurance: 0,
          medical: 0,
          savings: 0,
          invest: 0,
          debtPay: 0,
          recEnt: 0,
          misc: 0
        };
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
  width: 60%;
  height: auto;
  position: relative;
}

.modal-header,
.modal-footer {
  padding: 15px;
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
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}
</style>
