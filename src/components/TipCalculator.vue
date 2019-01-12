<template>
  <v-container>
    <v-layout text-xs-center justify-center wrap>
      <v-flex xs12>
        <h1>Tip Calculator</h1>
      </v-flex>

      <v-flex mt-5 mb-5 xs6>
        <v-layout justify-center column wrap>
          <v-flex xs6>
            <v-card class="calculator-border">
              <v-card-text>
                <v-text-field
                  v-model.number="totalBill"
                  prepend-icon="attach_money"
                  :error-messages="billAmountErrors"
                  color="deep-purple"
                  label="Total Bill"
                  @input="$v.totalBill.$touch()"
                  @blur="$v.totalBill.$touch()"
                ></v-text-field>

                <v-select
                  :items="items"
                  prepend-icon="money"
                  label="Percent of tip"
                  v-model="selectedTip"
                  :error-messages="tipErrors"
                  @input="$v.selectedTip.$touch()"
                  @blur="$v.selectedTip.$touch()"
                ></v-select>

                <v-text-field
                  v-model.number="partySize"
                  prepend-icon="people_outline"
                  color="deep-purple"
                  label="Party Size"
                  :error-messages="partySizeErrors"
                  @input="$v.partySize.$touch()"
                  @blur="$v.partySize.$touch()"
                ></v-text-field>

                <v-btn round color="primary" dark @click="calculateTip">Calculate</v-btn>
                <v-layout row wrap mt-4>
                  <v-flex xs12 md4 mt-2 class="custom-color">
                    <v-list>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title v-if="result">${{this.tipPrice}}</v-list-tile-title>
                          <v-list-tile-sub-title v-if="result && !share">Tip Amount</v-list-tile-sub-title>
                          <v-list-tile-sub-title v-else-if="result && share">Tip per person</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                  <v-flex xs12 md4 mt-2 v-if="result && tipPercent < 15">
                    <div>
                      <font-awesome-icon icon="meh"/>
                    </div>
                  </v-flex>
                  <v-flex xs12 md4 mt-2 v-else-if="result && tipPercent == 15">
                    <div>
                      <font-awesome-icon icon="smile-wink"/>
                    </div>
                  </v-flex>
                  <v-flex xs12 md4 mt-2 v-else-if="result && tipPercent == 18">
                    <div>
                      <font-awesome-icon icon="smile-beam"/>
                    </div>
                  </v-flex>
                  <v-flex xs12 md4 mt-2 v-else-if="result && tipPercent >= 18">
                    <div>
                      <font-awesome-icon icon="grin-beam"/>
                    </div>
                  </v-flex>
                  <v-flex xs12 md4 mt-2 class="custom-color">
                    <v-list>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title v-if="result">${{this.totalPrice}}</v-list-tile-title>
                          <v-list-tile-sub-title v-if="result && !share">Total Amount</v-list-tile-sub-title>
                          <v-list-tile-sub-title v-else-if="result && share">Total per person</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required, numeric, minValue } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      totalBill: null,
      selectedTip: null,
      tipPercent: null,
      partySize: null,
      items: ["5%", "10%", "15%", "18%", "20%"],
      totalPrice: null,
      tipPrice: null,
      result: false,
      share: false
    };
  },
  validations: {
    totalBill: {
      required,
      numeric,
      minValue: minValue(1)
    },
    selectedTip: {
      required
    },
    partySize: {
      required,
      numeric,
      minValue: minValue(1)
    }
  },
  computed: {
    billAmountErrors() {
      const errors = [];
      if (!this.$v.totalBill.$dirty) return errors;
      !this.$v.totalBill.minValue &&
        errors.push("Bill Amount must be greater than 0");
      !this.$v.totalBill.required && errors.push("Bill Amount is required.");
      return errors;
    },
    tipErrors() {
      const errors = [];
      if (!this.$v.selectedTip.$dirty) return errors;
      !this.$v.selectedTip.required && errors.push("Tip % is required.");
      return errors;
    },
    partySizeErrors() {
      const errors = [];
      if (!this.$v.partySize.$dirty) return errors;
      !this.$v.partySize.minValue &&
        errors.push("Party size must be greater than 0");

      return errors;
    }
  },
  methods: {
    calculateTip() {
      this.totalPrice = 0;
      this.tipPrice = 0;
      const tipPercentStr = this.selectedTip.replace("%", "");
      const tipPercent = Number(tipPercentStr);
      this.tipPercent = tipPercent;
      const tip = this.totalBill * (tipPercent / 100);
      this.tipPrice = tip.toFixed(2);
      const total = this.totalBill + tip;
      const totalFloat = total.toFixed(2);
      if (!this.partySize) {
        this.share = false;
        this.totalPrice = totalFloat;
        this.result = true;
      } else {
        this.totalPrice = (totalFloat / this.partySize).toFixed(2);
        this.tipPrice = (tip / this.partySize).toFixed(2);
        this.result = true;
        this.share = true;
      }
    }
  }
};
</script>

<style scoped>
.calculator-border {
  border-radius: 10px;
}

.svg-inline--fa.fa-w-16 {
  width: 3em !important;
  height: 3em;
  color: orange;
}
.custom-color {
  color: #868181;
}
</style>
