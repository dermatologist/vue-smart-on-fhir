import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

let Condition = function(patient_id){
  var smart = FHIR.client({
    serviceUrl: 'https://r2.smarthealthit.org',
    patientId: 'smart-1137192'
  });
  var conditions = smart.patient.api.search({type: 'Condition'});
  return new Vuex.Store(conditions);
};

export default Condition;