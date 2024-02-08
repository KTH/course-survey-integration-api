import { app } from "@azure/functions";
import kurstillfalleTillStatusEvent from "./ladok-events/kurstillfalleTillStatusEvent";
import modulTillStatusEvent from "./ladok-events/modulTillStatusEvent";
import paborjadUtbildningEvent from "./ladok-events/paborjatUtbildningstillfalleEvent";
import registreringEvent from "./ladok-events/registreringEvent";
import resultatPaHelKursAttesteratEvent from "./ladok-events/resultatPaHelKursAttesteratEvent";
import resultatPaModulAttesteratEvent from "./ladok-events/resultatPaModulAttesteratEvent";

const {
  LADOK3_FEED_SERVICE_BUS_TOPIC_NAME = "course-survey-integration-api-ref"
} = process.env;

const sharedProps = {
  connection: 'LADOK3_FEED_SERVICE_BUS_CONNECTION_STRING',
  topicName: LADOK3_FEED_SERVICE_BUS_TOPIC_NAME,
}

app.serviceBusTopic('Registrering', {
  ...sharedProps,
  ...registreringEvent,
  subscriptionName: 'registrering',
});

app.serviceBusTopic('PaborjatUtbildningstillfalleEvent', {
  ...sharedProps,
  ...paborjadUtbildningEvent,
  subscriptionName: 'paborjat-utbildningstillfalle',
});

app.serviceBusTopic('KurstillfälleTillStatus', {
  ...sharedProps,
  ...kurstillfalleTillStatusEvent,
  subscriptionName: 'kurstillfalle-till-status',
});

app.serviceBusTopic('ModuleTillStatus', {
  ...sharedProps,
  ...modulTillStatusEvent,
  subscriptionName: 'modul-till-status',
});

app.serviceBusTopic('ResultatPaModulAttesterat', {
  ...sharedProps,
  ...resultatPaModulAttesteratEvent,
  subscriptionName: 'resultat-pa-modul-attesterat',
});

app.serviceBusTopic('ResultatPaHelKursAttesterat', {
  ...sharedProps,
  ...resultatPaHelKursAttesteratEvent,
  subscriptionName: 'resultat-pa-hel-kurs-attesterat',
});
