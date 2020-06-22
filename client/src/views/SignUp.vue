<template>
  <div>
    <h1>Sign-up</h1>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          aria-describedby="nameHelp"
          v-model="name"
        />
      </div>
      <div class="form-group">
        <label for="email">Email address</label>
        <input
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          v-model="email"
        />
      </div>
      <div class="form-group">
        <label for="hourly-rate">Hourly Rate</label>
        <input
          type="number"
          class="form-control"
          id="hourly-rate"
          aria-describedby="emailHelp"
          v-model="hourlyRate"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="password"
        />
      </div>
      <div class="form-group">
        <label for="confirm-password">Confirm Password</label>
        <input
          type="password"
          class="form-control"
          id="confirm-password"
          v-model="confirmPassword"
        />
      </div>
      <button type="submit" class="btn btn-primary" @click.prevent="signin">
        Submit
      </button>
    </form>
    <div v-if="errors" class="alert alert-warning">
      <p v-for="error in errors" :key="error.msg">
        {{ error.msg }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      name: '',
      email: '',
      hourlyRate: '',
      password: '',
      confirmPassword: '',
    };
  },
  computed: mapState({
    errors: (state) => state.errors,
  }),
  methods: {
    async signin() {
      // Get form data
      const formData = {
        name: this.name,
        email: this.email,
        hourlyRate: this.hourlyRate,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };
      // Check password
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      try {
        await this.$store.dispatch('signin', formData).then((res) => {
          console.log(res);
        });
      } catch (error) {}
    },
  },
};
</script>

<style lang="scss" scoped></style>
