import FHIR from 'fhirclient';

const Conditions = function Conditions(pId) {
  const smart = FHIR.client({
    serviceUrl: 'https://r2.smarthealthit.org',
    // smart-1137192
    patientId: pId,
  });
  // $.Deferred
  return smart.patient.api.search({ type: 'Condition' });
};

export default Conditions;
