<template>
  <v-container>
    <time-range
      @consumption-data-fetched="onFetchData"
      @consumption-data-fetch-error="onFetchError"
    ></time-range>
    <v-layout row wrap>
      <div class="error-message" v-if="showError">
       {{ errorMessage }}
      </div>
    </v-layout>
    <v-layout row wrap v-if="consumptionDataLoaded">
      <v-flex xs12>
        <v-card class="Chart__container">
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Electricity consumption costs</h3>
                <div>
                  Period: <strong>{{ consumptionPeriod }}</strong>,
                  gruped by: <strong>{{ consumptionGrouping }}</strong>,
                  with price for KwH: <strong>{{ consumptionPrice }}</strong>.
                </div>
              </div>
            </v-card-title>
            <v-card-text class="Chart__content">
              <line-chart
                :chartData="consumptionData"
              ></line-chart>
            </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import ReportTimeRange from '@/components/ReportTimeRange'
  import LineChart from '@/components/LineChart'

  export default {
    name: 'consumption-report',
    components: {
      'time-range': ReportTimeRange,
      'line-chart': LineChart
    },
    methods: {
      onFetchData (e) {
        this.resetState()
        this.consumptionData = {
          labels: e.data.map(data => data.label),
          datasets: [
            {
              label: 'Electricity consumption costs',
              backgroundColor: 'transparent',
              data: e.data.map(data => data.consumption_cost)
            }
          ]
        }
        this.consumptionGrouping = e.group
        this.consumptionPrice = e.price
        this.consumptionStartDate = e.start
        this.consumptionEndDate = e.end
        this.consumptionDataLoaded = true
      },
      onFetchError (e) {
        this.showError = true
      },
      resetState () {
        this.consumptionLabels = null
        this.consumptionValues = null
        this.consumptionDataLoaded = false
        this.showError = false
      }
    },
    computed: {
      consumptionPeriod () {
        return `${this.consumptionStartDate} - ${this.consumptionEndDate}`
      }
    },
    data () {
      return {
        consumptionDataLoaded: false,
        consumptionValues: null,
        consumptionLabels: null,
        showError: false,
        consumptionStartDate: null,
        consumptionEndDate: null,
        consumptionGrouping: null,
        consumptionPrice: null,
        errorMessage: 'Ups! something went wrong...'
      }
    }
  }
</script>
