// data.js — single source of truth for programs, events, resources, news, agencies.
// Edit this file to update the site. All pages read from window.NMFAST_DATA.

window.NMFAST_DATA = {
  // ---------------- Programs ----------------
  programs: [
    {
      id: 'acsa',
      title: 'ACSA Accelerator',
      agency: 'Multi-agency · DOE, NASA, Space Force focus',
      shortDesc: 'Three cohort-based accelerators per year covering DOE/Energy, Space & Aerospace, and Phase II–III Commercialization Bridge. Free to NM founders.',
      stage: ['pre-sbir', 'phase-0', 'phase-1', 'phase-2'],
      sectors: ['advanced-energy', 'advanced-computing', 'bioscience', 'aerospace'],
      cost: 'Free',
      duration: '4–12 weeks depending on cohort',
      seats: '6–12 per cohort',
      deadlines: [
        { label: 'Apply by · Space & Aerospace', date: '2026-06-02' },
        { label: 'Cohort starts · Space & Aerospace', date: '2026-06-09' },
        { label: 'Apply by · Commercialization Bridge II–III', date: '2026-07-01' },
        { label: 'Cohort starts · Commercialization Bridge II–III', date: '2026-07-08' },
        { label: 'Apply by · DOE/Energy', date: '2026-09-15' },
        { label: 'Cohort starts · DOE/Energy', date: '2026-09-22' },
      ],
      featured: true,
      applyRouteTo: 'acsa',
    },
    {
      id: 'larta',
      title: 'Larta Commercialization',
      agency: 'Phase 0 → Phase II',
      shortDesc: 'Two 8–12 week cohorts per year, up to 20 companies each. Specialized SBIR/STTR commercialization training: workshops, 1-on-1 coaching, proposal and commercialization plan reviews.',
      stage: ['phase-0', 'phase-1', 'phase-2'],
      sectors: ['advanced-energy', 'advanced-computing', 'bioscience', 'aerospace'],
      cost: 'Free (by application)',
      duration: '8–12 weeks per cohort',
      seats: 'Up to 20 per cohort',
      deadlines: [
        { label: 'Apply by · Cohort 1', date: '2026-05-01' },
        { label: 'Cohort 1 starts', date: '2026-05-07' },
        { label: 'Apply by · Cohort 2', date: '2026-07-30' },
        { label: 'Cohort 2 starts', date: '2026-08-06' },
      ],
      featured: true,
      applyRouteTo: 'larta',
    },
    {
      id: 'workshops',
      title: 'Workshops & Webinars',
      agency: 'Open to all',
      shortDesc: 'Two SBIR 101 sessions + four agency-specific topic workshops per year. Hybrid format — in-person and Zoom. Free, no screening.',
      stage: ['pre-sbir', 'phase-0', 'phase-1'],
      sectors: ['advanced-energy', 'advanced-computing', 'bioscience', 'aerospace'],
      cost: 'Free',
      duration: '2 hours each',
      seats: 'Unlimited',
      deadlines: [
        { label: 'Topic Workshop · TBD', date: '2026-05-27' },
        { label: 'SBIR 101 · Spring', date: '2026-05-19' },
        { label: 'Topic Workshop · TBD', date: '2026-06-17' },
        { label: 'Cybersecurity for SBIR', date: '2026-07-21' },
        { label: 'SBIR 101 · Fall', date: '2026-09-15' },
        { label: 'Navigating Federal Agencies', date: '2026-10-21' },
      ],
      featured: true,
      applyRouteTo: 'workshops',
    },
    {
      id: 'office-hours',
      title: 'Weekly Office Hours',
      agency: 'Open to any NM founder',
      shortDesc: 'Book a 30-minute slot with an SBIR expert anytime. Bring a draft, a budget question, or just your idea — we meet you wherever you are.',
      stage: ['pre-sbir', 'phase-0', 'phase-1', 'phase-2'],
      sectors: ['advanced-energy', 'advanced-computing', 'bioscience', 'aerospace'],
      cost: 'Free',
      duration: '30 min slots',
      seats: 'Weekly · open enrollment',
      deadlines: [],
      applyRouteTo: 'office-hours',
    },
    {
      id: 'matching-grant',
      title: 'NMEDD Matching Grant',
      agency: 'State match · NMEDD',
      shortDesc: 'Two dedicated info + training sessions per year on the NMEDD SBIR Matching Grant process. One-on-one application support available on request.',
      stage: ['phase-1', 'phase-2'],
      sectors: ['advanced-energy', 'advanced-computing', 'bioscience', 'aerospace'],
      cost: 'Free',
      duration: '2 hours + follow-ups',
      seats: 'Unlimited',
      deadlines: [
        { label: 'Spring session', date: '2026-06-02' },
        { label: 'Fall session', date: '2026-09-24' },
      ],
      applyRouteTo: 'matching-grant',
    },
    {
      id: 'microgrants',
      title: 'Micro-grants',
      agency: 'Up to $2,000',
      shortDesc: 'Direct funding up to $2,000 for proposal development, registration fees, editing, graphics, or other costs blocking a submission. Up to 5 applications reviewed per year; minimum 2 awarded.',
      stage: ['phase-0', 'phase-1'],
      sectors: ['advanced-energy', 'advanced-computing', 'bioscience', 'aerospace'],
      cost: 'Non-dilutive · sliding scale',
      duration: 'Rolling',
      seats: 'Min. 2 awarded / year',
      deadlines: [],
      applyRouteTo: 'microgrants',
    },
    {
      id: 'travel',
      title: 'Travel Stipends',
      agency: 'National conferences',
      shortDesc: 'Two stipends per year to send NM founders to the National SBIR conference and similar federal events. Priority for underserved and rural applicants.',
      stage: ['phase-0', 'phase-1', 'phase-2'],
      sectors: ['advanced-energy', 'advanced-computing', 'bioscience', 'aerospace'],
      cost: 'Non-dilutive',
      duration: 'One-time',
      seats: '2 / year',
      deadlines: [],
      applyRouteTo: 'travel',
    },
    {
      id: 'los-alamos-makers',
      title: 'Los Alamos Makers',
      agency: 'Prototyping partner · Northern NM',
      shortDesc: 'Access to prototyping facilities, biotech wet lab, and community-based technical expertise in northern NM. Regional outreach partner connecting lab-adjacent innovators to NM FAST.',
      stage: ['pre-sbir', 'phase-0', 'phase-1'],
      sectors: ['advanced-energy', 'advanced-computing', 'bioscience', 'aerospace'],
      cost: 'Referral-based',
      duration: 'Project-dependent',
      seats: 'By referral',
      deadlines: [],
      applyRouteTo: 'los-alamos-makers',
    },
    {
      id: 'sfbi',
      title: 'Commercialization Bridge · SFBI',
      agency: 'Phase II → Phase III',
      shortDesc: 'A high-touch 4–5 week pilot for NM companies transitioning from Phase II R&D into Phase III commercialization, federal procurement, and revenue generation. Led by Santa Fe Business Incubator.',
      stage: ['phase-2'],
      sectors: ['advanced-energy', 'advanced-computing', 'bioscience', 'aerospace'],
      cost: 'Free',
      duration: '4–5 weeks',
      seats: '6–10 companies',
      deadlines: [
        { label: 'Apply by', date: '2026-07-01' },
        { label: 'Cohort starts', date: '2026-07-08' },
      ],
      applyRouteTo: 'sfbi',
    },
  ],

  // ---------------- Events ----------------
  events: [
    // SBIR 101 Webinars
    { date: '2026-05-19', title: 'SBIR 101 Webinar · Spring', kind: 'Webinar', format: 'Hybrid', programId: 'workshops', registrationUrl: 'https://luma.com/p13pzo0a' },
    { date: '2026-09-15', title: 'SBIR 101 Webinar · Fall', kind: 'Webinar', format: 'Hybrid', programId: 'workshops', registrationUrl: 'https://luma.com/qndzqend' },

    // Topic Workshops
    { date: '2026-05-27', title: 'Topic Workshop · TBD', kind: 'Workshop', format: 'Hybrid', programId: 'workshops', registrationUrl: 'https://luma.com/m57icgz4' },
    { date: '2026-06-17', title: 'Topic Workshop · TBD', kind: 'Workshop', format: 'Hybrid', programId: 'workshops', registrationUrl: 'https://luma.com/tnwgs42r' },
    { date: '2026-07-21', title: 'Cybersecurity for SBIR Applicants', kind: 'Workshop', format: 'In-person · Albuquerque', time: '9–11 AM', facilitator: 'Elythia McAnnerny', partner: 'APEX Accelerator', programId: 'workshops', registrationUrl: 'https://luma.com/crqyhzdn', tags: ['underserved'] },
    { date: '2026-10-21', title: 'Navigating Federal Agencies', kind: 'Workshop', format: 'Hybrid', programId: 'workshops', registrationUrl: 'https://luma.com/b8prnse4' },

    // ACSA Cohorts
    { date: '2026-06-02', title: 'ACSA · Space & Aerospace · Application deadline', kind: 'Cohort', format: 'Application due', programId: 'acsa', registrationUrl: null },
    { date: '2026-06-09', title: 'ACSA · Space & Aerospace Cohort · Starts', kind: 'Cohort', format: 'Virtual + in-person', programId: 'acsa', registrationUrl: null },
    { date: '2026-07-01', title: 'ACSA · Commercialization Bridge II–III · Application deadline', kind: 'Cohort', format: 'Application due', programId: 'acsa', registrationUrl: null },
    { date: '2026-07-08', title: 'ACSA · Commercialization Bridge II–III · Starts', kind: 'Cohort', format: 'Virtual', programId: 'acsa', registrationUrl: null },
    { date: '2026-09-15', title: 'ACSA · DOE/Energy · Application deadline', kind: 'Cohort', format: 'Application due', programId: 'acsa', registrationUrl: null },
    { date: '2026-09-22', title: 'ACSA · DOE/Energy Cohort · Starts', kind: 'Cohort', format: 'Hybrid', programId: 'acsa', registrationUrl: null },

    // Larta Cohorts
    { date: '2026-05-01', title: 'Larta Cohort 1 · Application deadline', kind: 'Cohort', format: 'Application due', programId: 'larta', registrationUrl: null, applyViaForm: true },
    { date: '2026-05-07', title: 'Larta Cohort 1 · Starts', kind: 'Cohort', format: 'Virtual', programId: 'larta', registrationUrl: null, applyViaForm: true },
    { date: '2026-07-30', title: 'Larta Cohort 2 · Application deadline', kind: 'Cohort', format: 'Application due', programId: 'larta', registrationUrl: null, applyViaForm: true },
    { date: '2026-08-06', title: 'Larta Cohort 2 · Starts', kind: 'Cohort', format: 'Virtual', programId: 'larta', registrationUrl: null, applyViaForm: true },

    // Matching Grant Sessions
    { date: '2026-06-02', title: 'NMEDD Matching Grant Info Session · Spring', kind: 'Info session', format: 'Virtual', programId: 'matching-grant', registrationUrl: 'https://luma.com/ptsqzmmi' },
    { date: '2026-09-24', title: 'NMEDD Matching Grant Info Session · Fall', kind: 'Info session', format: 'Virtual', programId: 'matching-grant', registrationUrl: 'https://luma.com/q9vley9k' },

    // Statewide Event
    { date: '2026-12-10', title: 'NM SBIR Statewide Showcase', kind: 'Event', format: 'In-person · New Mexico', programId: null, registrationUrl: 'https://luma.com/zkdo93lo' },
  ],

  // ---------------- Resources ----------------
  resources: [
    { kind: 'Guide', title: 'SBIR Quick-start Guide', desc: '30-page primer on SBIR/STTR mechanics for first-time NM applicants.' },
    { kind: 'Checklist', title: 'Phase I Submission Checklist', desc: 'Everything you need before you hit submit — registrations, personnel, attachments.' },
    { kind: 'Template', title: 'Commercialization Plan Template', desc: 'Word template mirroring what DOE and NSF reviewers score on.' },
    { kind: 'Video', title: 'SBIR 101 · Recorded Session', desc: 'Our most-requested webinar, archived on YouTube.' },
    { kind: 'Matrix', title: 'Agency Compliance Matrix', desc: 'Side-by-side comparison of the 12 participating SBIR agencies.' },
    { kind: 'Newsletter', title: 'Archive · Monthly Newsletters', desc: 'Every newsletter since 2021. Browse by topic or agency.' },
  ],

  // ---------------- Videos ----------------
  videos: [
    { title: 'SBIR 101 · Full Recorded Session', desc: 'The complete SBIR 101 webinar. Start here if you\'re new to SBIR/STTR.', url: '#', thumb: null },
  ],

  // ---------------- News ----------------
  news: [
    { date: '2026-02-17', title: 'Arrowhead Center Receives $450K NMEDD Grant to Sustain NM FAST', type: 'Press Release', url: '#' },
  ],

  // ---------------- Agencies ----------------
  agencies: [
    { id: 'doe', name: 'Department of Energy', shortName: 'DOE', url: 'https://science.osti.gov/sbir', topics: 'Advanced energy, grid, storage, hydrogen, clean generation', notes: 'Largest SBIR funder in NM. Three solicitation cycles per year.' },
    { id: 'nsf', name: 'National Science Foundation', shortName: 'NSF', url: 'https://seedfund.nsf.gov', topics: 'Deep tech, AI/ML, quantum, advanced computing', notes: 'America\'s Seed Fund. Rolling Phase I applications.' },
    { id: 'nasa', name: 'NASA', shortName: 'NASA', url: 'https://sbir.nasa.gov', topics: 'Space systems, propulsion, optics, UAS, aerospace', notes: 'Annual solicitation. Strong fit for NM aerospace founders.' },
    { id: 'dod', name: 'Department of Defense', shortName: 'DoD', url: 'https://www.dodsbirsttr.mil', topics: 'Defense tech, autonomy, cybersecurity, advanced materials', notes: 'Includes Army, Navy, Air Force, DARPA, Space Force.' },
    { id: 'nih', name: 'National Institutes of Health', shortName: 'NIH', url: 'https://seed.nih.gov', topics: 'Biotech, diagnostics, therapeutics, medical devices', notes: 'Three deadlines per year. Strong commercialization emphasis.' },
    { id: 'usda', name: 'US Dept. of Agriculture', shortName: 'USDA', url: 'https://nifa.usda.gov/program/sbir', topics: 'Agtech, food systems, rural innovation', notes: 'Annual solicitation. Good fit for NM agtech founders.' },
    { id: 'noaa', name: 'NOAA', shortName: 'NOAA', url: 'https://techpartnerships.noaa.gov/SBIR', topics: 'Climate, weather, ocean, environmental tech', notes: 'Smaller program. Annual solicitation.' },
    { id: 'dhs', name: 'Dept. of Homeland Security', shortName: 'DHS', url: 'https://www.dhs.gov/science-and-technology/sbir', topics: 'Cybersecurity, border tech, emergency response', notes: 'Annual solicitation.' },
    { id: 'dot', name: 'Dept. of Transportation', shortName: 'DOT', url: 'https://www.transportation.gov/sbir', topics: 'Transportation tech, autonomous vehicles, infrastructure', notes: 'Annual solicitation.' },
  ],

  // ---------------- Backend ----------------
  SHEETS_ENDPOINT: 'https://script.google.com/macros/s/AKfycbxuoOOR_ODbm3ubAiKvDMJF0vQ04MJ8FpgEccUC5mNOMWlDTz4IQgJTh_qjql6ZcKif/exec',
};
