import { shallow } from 'vue-test-utils'
import ReportTimeRange from '@/components/ReportTimeRange'

describe('ReportTimeRange.vue', () => {
  let cmp

  beforeEach(() => {
    cmp = shallow(ReportTimeRange)
  })

  it('is a ReportTimeRange component', () => {
    expect(cmp.is(ReportTimeRange)).toBe(true)
  })

  it('Both is vue instance', () => {
    expect(cmp.isVueInstance()).toBe(true)
  })

  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot()
  })
})
