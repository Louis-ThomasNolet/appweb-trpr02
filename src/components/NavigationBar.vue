<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <RouterLink class="nav-link" id="accueil" to="/">Accueil</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" id="score" :to="{ name: 'Score' }">
            Score
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" id="bataille" :to="{ name: 'Bataille' }">
            Bataille
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
