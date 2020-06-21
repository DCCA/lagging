<template>
  <div id="app">
    <div id="nav">
      <div>
        <router-link tag="a" to="/">Home</router-link>
        <router-link tag="a" to="/about">About</router-link>
      </div>

      <div>
        <router-link tag="a" to="/about">Sign Up</router-link>
        <router-link tag="a" to="/about">Log In</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  margin: 0 auto;
  max-width: 1250px;
  min-height: 100vh;
}

#nav {
  display: flex;
  align-content: center;
  justify-content: space-between;
}

a {
  text-decoration: none;
  padding: 0 1rem;
}
</style>
