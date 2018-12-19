# Development

## Environment

Node JS 10.10.3

## Start server

* Dev

```
ionic serve
```

* Dev with https

```
ng serve --ssl true --port 8100 --host 0.0.0.0
```

Then visit:  https://localhost:8100


# Deploy

* Build staging

```
ionic build --prod --configuration staging
```

* Build Production

```
ionic build --prod --configuration production
```


# Push files to s3

use  `--profile YourProfileAlias` flag for specific aws profile

* Staging

```
aws s3 sync ./www s3://staging.iwa-test.app
```

* Production

```
aws s3 sync ./www s3://iwa-test.app
```


# Clear CloudFont cache

* First time - enable AWS preview cloudfront

```
aws configure set preview.cloudfront true
```

* Staging

```
aws cloudfront create-invalidation --distribution-id E33FLDYDWZNLCY --paths /
```

* Production

```
aws cloudfront create-invalidation --distribution-id E121S7YH4WSMFJ --paths /
```
