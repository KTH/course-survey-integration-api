import { app } from "@azure/functions";
import kurstillfalleTillStatusEvent from "./ladok-events/kurstillfalleTillStatusEvent";
import modulTillStatusEvent from "./ladok-events/modulTillStatusEvent";
import paborjadUtbildningEvent from "./ladok-events/paborjatUtbildningstillfalleEvent";
import registreringEvent from "./ladok-events/registreringEvent";
import resultatPaHelKursAttesteratEvent from "./ladok-events/resultatPaHelKursAttesteratEvent";
import resultatPaModulAttesteratEvent from "./ladok-events/resultatPaModulAttesteratEvent";

const sharedProps = {
  connection: 'LADOK3_FEED_SERVICE_BUS_CONNECTION_STRING',
  topicName: 'ladok3-feed',
}

app.serviceBusTopic('Registrering', {
  ...sharedProps,
  ...registreringEvent,
  subscriptionName: 'csia-registrering',
});

// app.serviceBusTopic('PaborjatUtbildningstillfalleEvent', {
//   ...sharedProps,
//   ...paborjadUtbildningEvent,
//   subscriptionName: 'csia-paborjat-utbildningstillfalle',
// });

// app.serviceBusTopic('KurstillfälleTillStatus', {
//   ...sharedProps,
//   ...kurstillfalleTillStatusEvent,
//   subscriptionName: 'csia-kurstillfalle-till-status',
// });

// app.serviceBusTopic('ModuleTillStatus', {
//   ...sharedProps,
//   ...modulTillStatusEvent,
//   subscriptionName: 'csia-modul-till-status',
// });

// app.serviceBusTopic('ResultatPaModulAttesterat', {
//   ...sharedProps,
//   ...resultatPaModulAttesteratEvent,
//   subscriptionName: 'csia-resultat-pa-modul-attesterat',
// });

// app.serviceBusTopic('ResultatPaHelKursAttesterat', {
//   ...sharedProps,
//   ...resultatPaHelKursAttesteratEvent,
//   subscriptionName: 'csia-resultat-pa-hel-kurs-attesterat',
// });
