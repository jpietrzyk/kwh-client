# Energy consumption client

> Client for energy consumprion reports api

API Server is here:  https://github.com/jpietrzyk/kwh-api

It assumes you have got running api server on `localhost:3000` . If not, change your server address in `src/components/ReportTimeRange.vue` on line `190`.  

### ToDo

- [ ] Add tests
- [ ] Use router and reports history
- [ ] Add loading state when fetching data

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
