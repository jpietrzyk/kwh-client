<template>
  <v-layout row wrap>
    <v-flex d-flex xs12>
      <v-card>
        <v-card-title primary-title>
          <h3 class="headline mb-0">Choose time range and price</h3>
        </v-card-title>
        <v-container fluid grid-list-sm>
          <v-layout row wrap>
            <v-flex d-flex xs12 sm6>
              <v-dialog
                persistent
                v-model="startDateMenu"
                lazy
                full-width
                width="290px"
              >
                <v-text-field
                  slot="activator"
                  label="Start date"
                  v-model="startDateFormatted"
                  @input="$v.startDateFormatted.$touch()"
                  :error-messages="startDateErrors"
                  prepend-icon="event"
                  readonly required
                ></v-text-field>
                <v-date-picker
                  v-model="startDate"
                  @input="startDateFormatted = formatDate($event)"
                  scrollable actions
                  :allowed-dates="startAllowedDates"
                >
                  <template slot-scope="{ save, cancel }">
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                      <v-btn flat color="primary" @click="save">OK</v-btn>
                    </v-card-actions>
                  </template>
                </v-date-picker>
              </v-dialog>
            </v-flex>
            <v-flex d-flex xs12 sm6>
              <v-dialog
                persistent
                lazy
                v-model="endDateMenu"
                full-width
                width="290px"
              >
                <v-text-field
                  slot="activator"
                  label="End date"
                  v-model="endDateFormatted"
                  @input="$v.endDateFormatted.$touch()"
                  :error-messages="endDateErrors"
                  prepend-icon="event"
                  readonly required
                ></v-text-field>
                <v-date-picker
                  v-model="endDate"
                  @input="endDateFormatted = formatDate($event)"
                  scrollable actions
                  :allowed-dates="endAllowedDates"
                >
                  <template slot-scope="{ save, cancel }">
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                      <v-btn flat color="primary" @click="save">OK</v-btn>
                    </v-card-actions>
                  </template>
                </v-date-picker>
              </v-dialog>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm6>
              <v-select
                label="Group by"
                v-model="groupBy"
                prepend-icon="reorder"
                :items="groupByOptions"
                required
              ></v-select>
            </v-flex>
            <v-flex xs6 sm4>
              <v-text-field
              label="KwH Price"
              v-model="price"
              prepend-icon="payment"
              :error-messages="priceErrors"
              @input="$v.price.$touch()"
              @blur="$v.price.$touch()"
              required
            ></v-text-field>
            </v-flex>
            <v-flex xs6 sm2>
              <div>
                <v-btn
                  color="primary"
                  @click="getData">Get data</v-btn>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  import axios from 'axios'

  export default {
    name: 'report-time-range',
    mixins: [validationMixin],
    validations: {
      price: { required },
      groupBy: { required },
      startDateFormatted: { required },
      endDateFormatted: { required }
    },
    data: () => ({
      startDate: null,
      startDateFormatted: null,
      startDateMenu: false,
      endDate: null,
      endDateFormatted: null,
      endDateMenu: false,
      startAllowedDates: {
        min: null,
        max: null
      },
      endAllowedDates: {
        min: null,
        max: null
      },
      groupBy: 'day',
      groupByOptions: [
        'day',
        'week',
        'month'
      ],
      price: null
    }),
    computed: {
      priceErrors () {
        const errors = []
        if (!this.$v.price.$dirty) return errors
        !this.$v.price.required && errors.push('Price is required.')
        return errors
      },
      startDateErrors () {
        const errors = []
        if (!this.$v.startDateFormatted.$dirty) return errors
        !this.$v.startDateFormatted.required && errors.push('Start date is required.')
        return errors
      },
      endDateErrors () {
        const errors = []
        if (!this.$v.endDateFormatted.$dirty) return errors
        !this.$v.endDateFormatted.required && errors.push('End date is required.')
        return errors
      }
    },
    methods: {
      formatDate (date) {
        if (!date) {
          return null
        }

        const [year, month, day] = date.split('-')
        return `${day}-${month}-${year}`
      },
      parseDate (date) {
        if (!date) {
          return null
        }

        const [day, month, year] = date.split('-')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      getData () {
        this.$v.$touch()
        if (this.$v.$error) {
          return
        }
        axios.get('http://localhost:3000/electricity_consumption', {
          params: {
            start_date: this.startDateFormatted,
            end_date: this.endDateFormatted,
            group_by: this.groupBy,
            price: this.price
          }
        })
        .then(response => {
          this.$emit('consumption-data-fetched', {
            data: response.data,
            start: this.startDateFormatted,
            end: this.endDateFormatted,
            price: this.price,
            group: this.groupBy
          })
        })
        .catch(err => {
          this.$emit('consumption-data-fetch-error', err)
        })
      }
    },
    mounted () {
      const maxDate = new Date()
      const minDate = new Date()
      maxDate.setDate(maxDate.getDate() - 1)
      minDate.setFullYear(maxDate.getFullYear() - 2)
      this.startAllowedDates.min = minDate.toISOString().substr(0, 10)
      this.startAllowedDates.max = maxDate.toISOString().substr(0, 10)
      this.endAllowedDates.min = this.startAllowedDates.min
      this.endAllowedDates.max = this.startAllowedDates.max
    }
  }
</script>
