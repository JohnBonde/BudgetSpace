<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand">BudgetSpace</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div
      class="collapse navbar-collapse"
      id="navbarSupportedContent"
      style="justify-content: flex-end"
    >
      <button @click="logout" class="btn btn-danger" type="button">
        Logout
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar",
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style>
nav {
  color: white;
}

.btn-danger {
  background-color: #f7be7f !important;
}

.btn-danger:hover {
  background-color: #faac53 !important;
}
</style>
