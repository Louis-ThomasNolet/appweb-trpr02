<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-static-top">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="#">Star Battle</a>
      </div>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Accueil</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/bataille" class="nav-link">Bataille</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/score" class="nav-link">
              Classement
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
