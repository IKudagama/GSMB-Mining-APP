export const seed = {
  users: [
    { id:'P1', username:'police1', password:'police123', role:'police', name:'Sgt. Nuwan' },
    { id:'G1', username:'gsmb1',  password:'gsmb123',  role:'gsmb',  name:'Officer Tharindu' },
    { id:'O1', username:'owner1',  password:'owner123', role:'owner', name:'R. Perera' },
  ],
  lorries: [
    { plate:'SP-1234', ownerId:'O1' },
    { plate:'WP-5678', ownerId:'O1' },
  ],
  licenses: [
    { id:'L-001', ownerId:'O1', plate:'SP-1234', validFrom:'2025-08-01', validTo:'2025-12-31', status:'active' },
    { id:'L-002', ownerId:'O1', plate:'WP-5678', validFrom:'2025-06-01', validTo:'2025-08-05', status:'active' }, // expired
  ],
  reports: [
    // sample previous item
    { id:'RPT-1001', plate:'WP-5678', note:'Seen near site without sticker', location:'Anuradhapura', status:'rejected', createdAt:'2025-08-05T04:12:00Z', assignedTo:'P1', fineId:null },
  ],
  fines: [
    // empty initially
  ],
}
