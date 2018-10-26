import 'fhirclient';

const Conditions = function Conditions(pId) {
  const smart = window.FHIR.client({
    serviceUrl: 'https://r2.smarthealthit.org',
    // smart-1137192
    patientId: pId,
  });

  // const smart = window.FHIR.oauth2.authorize({
  //   client: {
  //     client_id: 'my_web_app',
  //     scope: 'patient/*.read launch/patient',
  //   },
  //   server: 'https://launch.smarthealthit.org/v/r3/sim/eyJoIjoiMSIsImoiOiIxIn0/fhir',
  // });

  // $.Deferred
  return smart.patient.api.search({ type: 'Condition' });
};

export default Conditions;
