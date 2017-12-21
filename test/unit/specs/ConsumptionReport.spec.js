import Vue from 'vue'
import ConsumptionReport from '@/components/ConsumptionReport'

describe('ConsumptionReport.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(ConsumptionReport)
    const vm = new Constructor().$mount()
  })
})
