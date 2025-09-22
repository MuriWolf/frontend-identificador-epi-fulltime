<script setup lang="ts"></script>

<template>
  <nav class="nav">
    <ul>
      <li title="Inicio">
        <RouterLink to="/">
          <font-awesome-icon icon="fa-solid fa-house" size="2xl" />
        </RouterLink>
      </li>
      <li title="Sobre nós">
        <RouterLink to="/sobre-nos">
          <font-awesome-icon icon="fa-solid fa-users" size="2xl" />
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="css" scoped>
.nav {
  background-color: #ed1c26;
  border-radius: 12px;
}

.nav ul {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0px;
}

.nav ul {
  list-style: none;
}

.nav li {
  all: unset;
}

.nav a {
  display: block;
  color: #f0f0f0;
  transition: all 0.25s ease-out;
  padding: 20px;
}

.nav a:hover {
  background-color: #eb6f75;
}
</style>
