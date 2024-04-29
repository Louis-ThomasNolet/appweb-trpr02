<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-static-top">
    <div class="container-fluid">
      <div class="navbar-header">
        <router-link to="/" class="navbar-brand" href="#" id="accueil"
          >Star Battle</router-link
        >
      </div>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/score" class="nav-link" id="classement">
              Classement
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
