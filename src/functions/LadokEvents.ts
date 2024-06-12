import { app } from "@azure/functions";
import kurstillfalleTillStatusEvent, { TKurstillfalleTillStatusEvent } from "./ladok-events/kurstillfalleTillStatusEvent";
import modulTillStatusEvent, { TModulTillStatusEvent } from "./ladok-events/modulTillStatusEvent";
import paborjadUtbildningEvent, { TPaborjatUtbildningstillfalleEvent } from "./ladok-events/paborjatUtbildningstillfalleEvent";
import registreringEvent, { TRegistreringEvent } from "./ladok-events/registreringEvent";
import resultatPaHelKursAttesteratEvent, { TResultatPaHelKursAttesteratEvent } from "./ladok-events/resultatPaHelKursAttesteratEvent";
import resultatPaModulAttesteratEvent, { TResultatPaModulAttesteratEvent } from "./ladok-events/resultatPaModulAttesteratEvent";
import attesteratResultatMakuleratEvent, { TAttesteratResultatMakuleratEvent } from "./ladok-events/attesteratResultatMakuleratEvent";
import messageArchiver from "./ladok-events/messageArchiver";
import { ServiceBus } from "./utils";

const {
  LADOK3_FEED_SERVICE_BUS_TOPIC_NAME = "course-survey-integration-api-ref",
} = process.env;

const SERVICEBUS_CONNECTION = process.env["SERVICEBUS_CONNECTION"] || "LADOK3_FEED_SERVICE_BUS_CONNECTION_STRING";

const sharedProps = {
  connection: SERVICEBUS_CONNECTION,
  topicName: LADOK3_FEED_SERVICE_BUS_TOPIC_NAME,
};

app.serviceBusTopic("Registrering", {
  ...sharedProps,
  handler: ServiceBus<TRegistreringEvent>(registreringEvent),
  subscriptionName: "registrering",
});

app.serviceBusTopic("PaborjatUtbildningstillfalleEvent", {
  ...sharedProps,
  handler: ServiceBus<TPaborjatUtbildningstillfalleEvent>(paborjadUtbildningEvent),
  subscriptionName: "paborjat-utbildningstillfalle",
});

app.serviceBusTopic("KurstillfalleTillStatus", {
  ...sharedProps,
  handler: ServiceBus<TKurstillfalleTillStatusEvent>(kurstillfalleTillStatusEvent),
  subscriptionName: "kurstillfalle-till-status",
});

app.serviceBusTopic("ModuleTillStatus", {
  ...sharedProps,
  handler: ServiceBus<TModulTillStatusEvent>(modulTillStatusEvent),
  subscriptionName: "modul-till-status",
});

app.serviceBusTopic("ResultatPaModulAttesterat", {
  ...sharedProps,
  handler: ServiceBus<TResultatPaModulAttesteratEvent>(resultatPaModulAttesteratEvent),
  subscriptionName: "resultat-pa-modul-attesterat",
});

app.serviceBusTopic("ResultatPaHelKursAttesterat", {
  ...sharedProps,
  handler: ServiceBus<TResultatPaHelKursAttesteratEvent>(resultatPaHelKursAttesteratEvent),
  subscriptionName: "resultat-pa-hel-kurs-attesterat",
});

app.serviceBusTopic('AttesteratResultatMakulerat', {
  ...sharedProps,
  handler: ServiceBus<TAttesteratResultatMakuleratEvent>(attesteratResultatMakuleratEvent),
  subscriptionName: 'attesterat-resultat-makulerat',
});

app.serviceBusTopic("MessageArchiver", {
  ...sharedProps,
  handler: ServiceBus<any>(messageArchiver),
  subscriptionName: "message-archiver",
});
