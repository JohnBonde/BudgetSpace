<template>
  <div class="home">
    <header class="container-fluid">
      <navbar />
    </header>
    <div class="body container-fluid">
      <div class="row">
        <div class="col-6 create-btn">
          <button
            v-if="!myBudget"
            type="button"
            class="btn btn-primary"
            @click="showModal"
          >Create Budget</button>
        </div>
        <div class="col-6 edit-btn">
          <button
            v-if="myBudget"
            type="button"
            class="btn btn-primary"
            @click="
              showModal2();
              forceRerender();
            "
          >Edit Budget</button>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <budget :budgetData="myBudget" :userData="budgets" :key="componentKey" />
        </div>
      </div>
      <create-modal v-show="isModalVisible" @close="closeModal" />
      <edit-modal
        :bData="myBudget"
        :uData="userInfo"
        :key="componentKey"
        v-show="isModalVisible2"
        @close="closeModal2"
      />
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import CreateModal from "../components/CreateModal";
import EditModal from "../components/EditModal";
import Budget from "../components/Budget";
export default {
  name: "home",
  components: {
    Navbar,
    CreateModal,
    EditModal,
    Budget
  },
  mounted() {
    this.$store.dispatch("getBudgets");
    this.$store.dispatch("getMyBudget");
  },
  data() {
    return {
      isModalVisible: false,
      isModalVisible2: false,
      componentKey: 0
    };
  },
  computed: {
    budgets() {
      return this.$store.state.budgets;
    },
    user() {
      return this.$store.state.user;
    },
    myBudget() {
      return this.$store.state.myBudget;
    },
    userInfo() {
      let userInfo = {};
      userInfo._id = this.$store.state.myBudget._id;
      return userInfo;
    }
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    showModal2() {
      this.isModalVisible2 = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    closeModal2() {
      this.isModalVisible2 = false;
    },
    logout() {
      this.$store.dispatch("logout");
    },
    forceRerender() {
      this.componentKey += 1;
    }
  }
};
</script>
<style scoped>
header {
  padding: 0;
}

.btn-primary {
  background-color: #2aaf74 !important;
}

.btn-primary:hover {
  background-color: #4ed99c !important;
}

.create-btn {
  padding: 10px;
  justify-content: flex-start;
  display: flex;
}

.edit-btn {
  padding: 10px;
  justify-content: flex-end;
  display: flex;
}
</style>
