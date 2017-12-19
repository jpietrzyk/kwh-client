import Vue from 'vue'
import Router from 'vue-router'
import ConsumptionReport from '@/components/ConsumptionReport'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ConsumptionReport',
      component: ConsumptionReport
    }
  ]
})
