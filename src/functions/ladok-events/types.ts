export type TLadokEventUserProperties = {
  content_HYPHEN_Type: string //'application/json'
  ladok3AtomEntryId: string // 'b13bb75e-902e-11ee-81dd-dd57e0af499b'
  ladok3AtomEntryIndexInFeed: number // 0
  ladok3AtomEntryUpdated: string // '2023-12-01T10:47:50.358'
  ladok3AtomFeed: string // 'https://api.ladok.se:443/uppfoljning/feed/317137'
  ladok3EventId: string // 'b0c3c76e-902e-11ee-8455-d76a329e44d6'
  ladok3EventType: string // 'se.ladok.schemas.resultat.AnmalanPaAktivitetstillfalleEvent'
  ladok3IsLastFeed: boolean
  ladok3MessageSequenceNumber: number // 128310
  ladok3MessageType: string // 'ladok3Event'
  ladok3Username?: string // '[username]@kth.se'
  traceparent: string // '00-2981b58f9654ef80b29f4028d80565f0-2b59598bb4ce2c6b-01'
}

export type TLadokEventContext = {
  AnvandareUID: string, // "66830d48-51f3-11ec-8f26-98603a8f42a4",
  Anvandarnamn: string, // "jhsware@kth.se",
  LarosateID: number, // 29
}

export type TLadokAttributvarde = {
  Grupp: number, // 0,
  Namn: string, // "utbildning.attribut.undervisningstid",
  Varde: string, // "101052",
  Uid: string, // "3ea87095-9507-11ee-a0ce-a9a57d284dbd"
}

// - Utbildningsinformation:KurstillfalleEvent
// se.ladok.schemas.utbildningsinformation.KurstillfalleEvent
export type TKurstillfalle = {
}

// - Utbildningsinformation:KurstillfalleUppdateratEvent
// se.ladok.schemas.utbildningsinformation.KurstillfalleUppdateratEvent
export type TKurstillfalleUppdaterat = {
}

// - Utbildningsinformation:KurstillfalleTillStatusEvent
// se.ladok.schemas.utbildningsinformation.KurstillfalleTillStatusEvent
export type TKurstillfalleTillStatus = {
}

// - Studiedeltagande:RegistreringEvent
// se.ladok.schemas.studiedeltagande.RegistreringEvent
export type TRegistrering = {
}
