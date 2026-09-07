# FGP — génération des blobs de déploiement Scalingo

## C'est quoi FGP ?

**FGP** (fine-grained-proxy) est un proxy HTTP stateless devant l'API Scalingo. On
lui donne un blob chiffré qui garde, pour un périmètre donné, un token Scalingo,
la liste des routes autorisées (méthode + chemin) et, optionnellement, des
contraintes sur le **corps** des requêtes POST.

Le fichier `config.toml` **est** cette liste de routes/contraintes, en source
unique. Un exécutable le lit et appelle FGP pour produire, par environnement,
un couple **URL + token** (= clé client) permettant les déploiements via le
proxy, sans exposer le token Scalingo complet.

Ça sert à déclencher/monitorer les déploiements Scalingo de Nos Gestes Climat
depuis du CI sans manipuler directement l'API Scalingo : 4 blobs scoping
`prod`, `preprod`, `review apps` et le **hook postdeploy** (recopie de la
DATABASE_URL vers le site jumeau).

## Fichiers

| Fichier               | Rôle                                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `config.toml`         | **La** config : 1 bloc `[env.*]` par environnement, ses `routes` (sans body) et ses `[[scope]]` POST avec `[body]`. |
| `plan.py`             | Utilitaire (pas à lancer) : transforme `config.toml` en plan JSON pour FGP. Le .sh l'appelle en interne.            |
| `generate-configs.sh` | **Le script à lancer** : lit la config, interroge `/api/generate` et affiche url + token par env.                   |

## Usage

```bash
SCALINGO_API_TOKEN=tk-us-xxx ./generate-configs.sh
```

Défauts lus dans `config.toml` : instance FGP (`global.fgp_base_url`) et
TTL. Surcharge possible :
`FGP_BASE_URL=…` et `FGP_TTL=…` (0 = sans expiration).

Sorties sensibles (url/blobs + token) : ne pas les fuiter.

`JSON_ONLY=1` affiche un JSON consommable (`{env, url, token}` par ligne).

## Modifier une route

Éditer `config.toml` (ajouter une entrée `routes` sans body, ou un
`[[scope]]` POST avec sa sous-table `[body]`). Légende des body filters dans
l'en-tête du fichier.
