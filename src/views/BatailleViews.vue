<script setup lang="ts"></script>
<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-7">
          <div class="card border-0">
            <div class="card-header text-white bg-primary">Actions</div>
            <div class="card-body text-white bg-dark">
              <div class="row">
                <div class="col-4">
                  <button class="btn btn-primary">Attaquer</button>
                </div>
                <div class="col-4">
                  <button class="btn btn-primary">Terminer la mission</button>
                </div>
                <div class="col-4">
                  <button class="btn btn-primary">
                    Terminer la mission et réparer le vaisseau
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-5">
          <div class="card border-0">
            <div class="card-header text-white bg-primary">
              Mission en cours
            </div>
            <div class="card-body text-white bg-dark">
              <div>objectif/5</div>
              <div>
                Objectif: Vous dever éliminer 5 vaisseau afin de remporter des
                crédits galactiques
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="card border-0">
            <div class="card-header text-white bg-primary">Nom du joueur</div>
            <div class="card-body text-white bg-dark">
              <p>Niveaux du joueur et nombre de crédit galactiques</p>
              <p>Vaisseau</p>
              <div class="progress">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style="width: 100%"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="col">
            <div class="card border-0">
              <div class="card-header text-white bg-primary">Nom du joueur</div>
              <div class="card-body text-white bg-dark">
                <p>Niveaux du joueur et nombre de crédit galactiques</p>
                <p>Vaisseau</p>
                <div class="progress">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    style="width: 100%"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style></style>
