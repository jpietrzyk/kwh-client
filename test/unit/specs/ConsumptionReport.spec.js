import { shallow } from 'vue-test-utils'
import ConsumptionReport from '@/components/ConsumptionReport'

describe('ConsumptionReport.vue', () => {
  let cmp

  beforeEach(() => {
    cmp = shallow(ConsumptionReport)
  })

  it('is a ConsumptionReport component', () => {
    expect(cmp.is(ConsumptionReport)).toBe(true)
  })

  it('Both is vue instance', () => {
    expect(cmp.isVueInstance()).toBe(true)
  })

  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot()
  })
})
