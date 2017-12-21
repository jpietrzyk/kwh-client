import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.config.productionTip = false
Vue.use(Vuetify)

window.Vue = Vue

var app = document.createElement('div')
app.setAttribute('data-app', true)
document.body.appendChild(app)
