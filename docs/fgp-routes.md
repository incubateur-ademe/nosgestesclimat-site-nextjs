# FGP Routes Reference

All requests authenticated with `X-FGP-Key: $FGP_DEPLOY_TOKEN`.

---

## Prod

```
GET:/v1/apps/nosgestesclimat/deployments/*
GET:/v1/apps/nosgestesclimat/deployments/*/output

GET:/v1/apps/nosgestesclimat-site/deployments/*
GET:/v1/apps/nosgestesclimat-site/deployments/*/output

POST:/v1/apps/nosgestesclimat-site/deployments
POST:/v1/apps/nosgestesclimat/deployments
```

```
deployment.git_ref: main
deployment.source_url: https://github.com/incubateur-ademe/nosgestesclimat-app/archive/main.tar.gz
```

---

## Preprod

```
GET:/v1/apps/nosgestesclimat-preprod/deployments/*
GET:/v1/apps/nosgestesclimat-preprod/deployments/*/output

GET:/v1/apps/nosgestesclimat-site-preprod/deployments/*
GET:/v1/apps/nosgestesclimat-site-preprod/deployments/*/output

POST:/v1/apps/nosgestesclimat-site-preprod/deployments
POST:/v1/apps/nosgestesclimat-preprod/deployments
```

```
deployment.git_ref: main
deployment.source_url: https://github.com/incubateur-ademe/nosgestesclimat-app/archive/main.tar.gz
```

`DATABASE_URL` is set manually on `nosgestesclimat-site-preprod` — no FGP route needed.

---

## Review (preprod PR)

```
POST:/v1/apps/nosgestesclimat-preprod/scm_repo_link/manual_review_app
POST:/v1/apps/nosgestesclimat-site-preprod/scm_repo_link/manual_review_app
POST:/v1/apps/nosgestesclimat-preprod-pr*/deployments
POST:/v1/apps/nosgestesclimat-site-preprod-pr*/deployments
GET:/v1/apps/nosgestesclimat-preprod-pr*/deployments/*
GET:/v1/apps/nosgestesclimat-site-preprod-pr*/deployments/*
GET:/v1/apps/nosgestesclimat-preprod-pr*/deployments/*/output
GET:/v1/apps/nosgestesclimat-site-preprod-pr*/deployments/*/output
```

**/scm_repo_link/manual_review_app**

```
pull_request_id: *
```

**/deployments**

```
deployment.git_ref: main
deployment.source_url: https://github.com/incubateur-ademe/nosgestesclimat-app/archive/main.tar.gz
```

## From postdeploy scalingo hook on server review app

```
POST:/v1/apps/nosgestesclimat-site-preprod-pr*/variables`
```

```
variable.name: "DATABASE_URL",
variable.value: "postgresql://..."
```
