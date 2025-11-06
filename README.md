## Compte-Rendu : Déploiement d'une Application Web 100% Serverless (Parcours Azure)

### Objectif Global

Ce projet avait pour but de déployer une application web complète (API backend et frontend statique) en utilisant exclusivement des services *serverless* de Microsoft Azure. L'architecture finale met en œuvre un routage unifié permettant de contourner les problèmes de sécurité (CORS) et de fournir une solution professionnelle, sécurisée et scalable.

---

### Étape 1 : Déploiement de l'API REST en mode Serverless

**Objectif :** Créer et déployer une API minimale dans un environnement 100% serverless.

* **API Flask minimale :** Une application Flask (app.py) expose une route GET `/hello` retournant un message JSON.
* **Conteneurisation :** L'application est empaquetée dans une image Docker (`mon-api-flask`) à l'aide d'un `Dockerfile`.
* **Publication :** L'image est poussée dans un **Azure Container Registry (ACR)** privé (`azrtp2yann`).
* **Déploiement :** L'image est déployée sur **Azure Container Apps** (`mon-api-flask-app`).
* **Vérification :** L'URL publique (...azurecontainerapps.io/hello) retourne le JSON attendu.


---

### Étape 2 : Exposition de l'API via une Passerelle Publique

**Objectif :** Ajouter une couche de gestion (versioning, sécurité, CORS) via **Azure API Management (APIM)**.

* **Spécification OpenAPI :** Le fichier `openapi.yaml` décrit la route GET `/hello`.
* **Création du service APIM :** Déployé en mode *Consumption* (serverless).
* **Import et configuration :** L'API est importée depuis `openapi.yaml` et liée à l'URL du backend.
* **Test d'accès :** Après modification pour autoriser l'accès anonyme, la route `/v1/hello` fonctionne via `...azure-api.net/v1/hello`.


---

### Étape 3 : Hébergement du Site Web Statique

**Objectif :** Créer un frontend statique et le connecter à l'API.

* **Contenu :** Site simple (`index.html`, `main.js`) appelant l'API via l'URL de la passerelle APIM.
* **Hébergement :** Utilisation d'un **Azure Storage Account** (`sttp2yann`) avec la fonctionnalité *Static Website* activée.
* **Problème CORS :** L'appel API échoue initialement à cause de domaines différents.
* **Résolution :** Une politique CORS est ajoutée dans APIM pour autoriser le domaine du site.


---

### Étape 4 : Distribution via un CDN / Routage Unifié

**Objectif :** Offrir un point d'entrée unique et éliminer définitivement le CORS.

* **Problème Azure :** Azure Front Door était indisponible (maintenance).
* **Solution Alternative :** Utilisation d'un **Azure Application Gateway** en remplacement.
* **Routage :**

  * `/` → site statique (Azure Storage)
  * `/v1/*` → API (Azure API Management)
* **Nom de domaine :** `felipechinois.duckdns.org` associé à l'IP publique de la passerelle.
* **Test final :**

  * Le site et l'API sont accessibles via le même domaine.
  * Le CORS est naturellement résolu.




### Conclusion

L’application web déployée illustre une architecture *serverless* intégrale sur Azure, combinant **conteneurs**, **API Management**, **stockage statique** et **routage unifié**.

