import FHIR from 'fhirclient';

let Conditions = function(patient_id){
  var smart = FHIR.client({
    serviceUrl: 'https://r2.smarthealthit.org',
    patientId: 'smart-1137192'
  });
  // $.Deferred
  return smart.patient.api.search({type: 'Condition'});
};

export default Conditions;