export const services = [
  {
    id: 'second-opinion',
    number: '01',
    name: 'Medical Second Opinion',
    headline: ['Confidence', 'Before You Decide.'],
    summary:
      'Gain certainty and peace of mind with expert diagnosis and report review by India’s leading specialists.',
    description:
      'Get a trusted expert medical second opinion before you decide. Leading specialists across India review your diagnosis, treatment plan or surgery recommendation so you can move forward with confidence. We represent your case as if you were family — structured, complete and unbiased.',
    features: [
      'Expert doctors from leading hospitals',
      'Report review within 24–72 hours',
      'Save unnecessary surgeries and costs',
      'Case evaluation with complete records',
      'Personalized treatment recommendations',
      'Support for domestic and international patients',
    ],
    audience: [
      'Serious or complex diagnoses',
      'Surgery confirmation',
      'International patients exploring India',
      'Reassurance before major treatment',
    ],
    programs: [
      { title: 'Heart Disease & Cardiology', text: 'ECG and angiography audit with a senior cardiologist.' },
      { title: 'Cancer & Oncology', text: 'Biopsy and PET-CT review, including tumor-board insight.' },
      { title: 'Fertility & IVF', text: 'IVF protocol audit with a reproductive specialist.' },
      { title: 'Orthopedic & Joint Surgery', text: 'MRI and X-ray audit with spine and knee specialists.' },
      { title: 'General & Laparoscopic Surgery', text: 'Surgical necessity assessment and minimally invasive care.' },
      { title: 'Gastroenterology & Liver Care', text: 'Endoscopy and scan audit with a gastro specialist.' },
      { title: 'Kidney Disease & Nephrology', text: 'Renal function and dialysis audit with a senior nephrologist.' },
    ],
    cta: 'Request a Second Opinion',
    href: '/contact',
    steps: ['Upload records', 'Expert review', 'Your report', 'You decide'],
  },
  {
    id: 'medical-tourism',
    number: '02',
    name: 'Medical Tourism',
    headline: ['World-Class Healthcare.', 'One Guided Journey.'],
    summary:
      'Access world-class, globally renowned healthcare in India with complete end-to-end travel assistance.',
    description:
      'Top medical specialists, affordable accredited treatments, and end-to-end travel assistance. International patients receive hospital matching, visa and stay support, and a dedicated care desk from first enquiry through recovery at home. Save 50–80% on surgery costs versus typical Western prices, without navigating care alone.',
    features: [
      'International patient coordination',
      'Hospital and doctor selection',
      'Treatment planning and cost estimation',
      'Visa and travel support',
      'Airport pickup and accommodation',
      'Multilingual support',
      'Post-treatment follow-up',
      'Access to JCI, NABH, NABL and ISO centres',
    ],
    audience: ['Mumbai', 'Delhi NCR', 'Bangalore', 'Chennai', 'Hyderabad'],
    programs: [
      { title: 'Cardiology', text: 'Cardiac surgery and interventional care.' },
      { title: 'Orthopedics & Joint Replacement', text: 'Spine, knee and reconstruction.' },
      { title: 'Oncology', text: 'Cancer treatment including haemato-oncology and BMT.' },
      { title: 'Neurology & Neurosurgery', text: 'Advanced neurological procedures.' },
      { title: 'Urology & Kidney Transplant', text: 'Surgical and transplant pathways.' },
      { title: 'Fertility & IVF', text: 'Reproductive care with coordinated travel.' },
      { title: 'Spine & Scoliosis Surgery', text: 'Specialist spine centres.' },
      { title: 'Ophthalmology', text: 'Vision and eye surgery.' },
    ],
    cta: 'Get a Treatment Quote',
    href: '#global',
    steps: ['Contact us', 'Prepare to travel', 'Arrive & treat', 'Fly home'],
  },
  {
    id: 'disease-reversal',
    number: '03',
    name: 'Disease Reversal',
    headline: ['Treat the Root.', 'Transform Your Life.'],
    summary:
      'Harness holistic nutrition and lifestyle protocols to reverse chronic conditions naturally at the root.',
    description:
      'Reverse diabetes, obesity and heart disease with doctor-guided lifestyle science. Lower or stop medications safely where clinically appropriate, with personalized nutrition, fitness and behavioral coaching. Clinically proven, doctor-guided, 100% natural methods — 4,000+ patients helped.',
    features: [
      'Type 2 diabetes management and reversal',
      'Blood pressure control',
      'Cholesterol and heart-risk reduction',
      'Medical weight management',
      'Fatty liver disease reversal',
      'CGM and dedicated diabetologist support',
      'Custom diet plans with regular modifications',
      'Weekly one-to-one expert consultations',
      'Unlimited WhatsApp support in working hours',
      'Digital health dashboard and tracking',
    ],
    audience: ['Diabetes', 'Hypertension', 'Obesity', 'Cholesterol', 'Fatty liver'],
    programs: [
      {
        title: 'Type 2 Diabetes (90-day)',
        text: 'Physician-supervised program to lower HbA1c, reduce medication reliance and restore metabolic wellness.',
      },
      {
        title: 'Blood Pressure Control',
        text: 'Vascular health optimization, sodium balance and guided stress management.',
      },
      {
        title: 'Cholesterol Management',
        text: 'Lipid profile regulation and a heart-healthy lifestyle reset.',
      },
      {
        title: 'Medical Weight Management',
        text: 'Metabolic assessment, sustained fat-loss protocols and physician supervision.',
      },
      {
        title: 'Fatty Liver Reversal',
        text: 'Hepatic fat reduction, enzyme normalization and an anti-inflammatory diet.',
      },
    ],
    highlight: '4,000+ Patients Helped',
    cta: 'Start Your Health Journey',
    href: '/contact',
    steps: ['Assess', 'Coach', 'Change', 'Sustain'],
  },
  {
    id: 'corporate-wellness',
    number: '04',
    name: 'Corporate Wellness',
    headline: ['Healthier People.', 'Stronger Organizations.'],
    summary:
      'Foster a healthier, high-performing workforce with preventive programs and health analytics.',
    description:
      'Proactive corporate health programs for startups, SMEs and large enterprises. End-to-end healthcare management, data-driven analytics and people-centered workplace care — 100% confidential. Early risk detection, biometric screening and coaching that reduce diabetes, obesity and heart-disease risk while lifting productivity.',
    features: [
      'Preventive health check-ups and executive screenings',
      'Employee health risk assessment (HRA)',
      'Biometric screening',
      'Corporate health score and ROI analytics',
      'Wellness coaching and lifestyle programs',
      'Nutrition, cafeteria audit and diet plans',
      'Mental health and stress resilience',
      'Lifestyle disease management',
      'Medical record structuring and EMR',
      'Virtual health consultations',
    ],
    audience: ['Startups', 'SMEs', 'Large enterprises', '100% confidential'],
    programs: [
      { title: 'Medical Record Structuring', text: 'Digitize employee health histories into a secure EMR.' },
      { title: 'Health Risk Assessment', text: 'Screen metabolic markers and lifestyle factors early.' },
      { title: 'Corporate Health Score', text: 'Workforce wellness metrics, absenteeism and ROI.' },
      { title: 'Employee Wellness Coaching', text: '1:1 coaching on stress, sleep and daily habits.' },
      { title: 'Nutrition & Cafeteria Audit', text: 'Dietitian evaluation of workplace food and menus.' },
      { title: 'Lifestyle Disease Management', text: 'Onsite and virtual programs for diabetes, BP and cardiac health.' },
    ],
    cta: 'Request a Corporate Quote',
    href: '/contact',
    steps: ['Screen', 'Insight', 'Program', 'Support'],
  },
]

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Patient OS', href: '/patient-os' },
  { label: 'Doctors', href: '/doctors' },
  { label: 'Technology', href: '/technology' },
  { label: 'Contact', href: '/contact' },
]

export const stats = [
  { value: 25, suffix: 'K+', label: 'Patients Guided' },
  { value: 500, suffix: '+', label: 'Expert Specialists' },
  { value: 50, suffix: '+', label: 'Hospital Partners' },
  { value: 15, suffix: '+', label: 'Countries' },
  { value: 10, suffix: 'K+', label: 'Second Opinions' },
  { value: 95, suffix: '%', label: 'Satisfaction Rate' },
]

export const loginUrl = 'https://secure.abchealth.in'
