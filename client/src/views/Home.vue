<template>
  <div class="home">
    <button type="button" class="btn btn-primary" @click="showModal">
      Create Budget
    </button>
    <create-modal v-show="isModalVisible" @close="closeModal" />
  </div>
</template>

<script>
import CreateModal from "../components/CreateModal";
export default {
  name: "home",
  components: {
    CreateModal
  },
  mounted() {
    this.$store.dispatch("getBudgets");
  },
  data() {
    return {
      isModalVisible: false
    };
  },
  computed: {
    budgets() {
      this.$store.state.publicBudgets;
    },
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>
