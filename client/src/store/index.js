import Vue from 'vue';
import Vuex from 'vuex';

const apiUrl = 'http://localhost:3000';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: null,
    token: null,
    errors: null,
  },
  mutations: {
    resetErrors(state) {
      state.errors = null;
    },
    setErrors(state, errors) {
      state.errors = errors;
    },
    authUser(state, data) {
      (state.userId = data.userId), (state.token = data.token);
    },
  },
  actions: {
    signin: async (context, signinData) => {
      // Reset errors
      context.commit('resetErrors');
      // Get values from form
      const name = signinData.name;
      const email = signinData.email;
      const hourlyRate = signinData.hourlyRate;
      const password = signinData.password;
      // Request to API
      let response;
      await fetch(`${apiUrl}/api/v1/sign-up`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          hourlyRate,
          password,
        }),
      })
        .then(async (res) => {
          const body = await res.json();
          // Validate response
          if (res.status !== 201) {
            context.commit('setErrors', body.errors);
          }
          response = res;
        })
        .catch((err) => {
          console.log(err);
        });
      return response;
    },
    logIn: (context, authData) => {
      const email = authData.email;
      const password = authData.password;
    },
  },
  modules: {},
});
