---
outline: deep
---


# Revue du travail d'Alexis

## Semaine 1

* ### il a commencé les components
* ### il a commencé les vues
* ### il a commencé a faire les interfaces
* ### il a trouvé un logo pour le site

## Semaine 2

* ### il a fait les service d'accès à la BD pour les vaisseaux et les Personnages
* ### il a fait le fonctionnement d'envoie de l'information a la battaille mais il avait utiliser des params au lieu de query

  #### Avec Params


  ```ts
  const startGame = () => {
    console.log(
      "Starting game with name:",
      name.value,
      "and ship:",
      selectedShip.value
    );
    router.push({
      name: "Bataille",
      params: { name: name.value, selectedShip: selectedShip.value },
    });
  }; 
  ```

  #### Avec Query

  ```ts
  const startGame = () => {
    console.log(
      "Starting game with name:",
      name.value,
      "and ship:",
      selectedShip.value
    );
    router.push({
      name: "Bataille",
      query: { name: name.value, selectedShip: selectedShip.value },
    });
  };
  ```
* ### il a fini le formulaire de création d'un joueur
* ### il a ajouté des scores dans la base de données

---
---
