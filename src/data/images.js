const u = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const images = {
  heroBanner: u('photo-1516549655169-df83a0774514', 2400),
  heroClinician: u('photo-1576091160550-2173dba999ef', 1400),
  specialistReview: u('photo-1551076805-e1869033e561', 900),
  patientCare: u('photo-1576091160399-112ba8d25d1d', 900),
  modernFacility: u('photo-1519494026892-80bbd2d6fd0d', 1200),
  dataReview: u('photo-1579684385127-1ef15d508118', 1000),
  wellness: u('photo-1571019613454-1cb2f99b2d8b', 900),
  doctors: [
    u('photo-1612349317150-e413f6a5b16d', 900),
    u('photo-1622253692010-333f2da6031d', 900),
    u('photo-1537368910025-700350fe46c7', 900),
    u('photo-1582750433449-648ed127bb54', 900),
    u('photo-1612349316228-5942a9b489c2', 900),
    u('photo-1638202993928-7267aad84c31', 900),
  ],
}
