import { images } from './images'
import abhay from "../assets/images/abhay_nene.jpeg"
import ajit from "../assets/images/ajit_menon.jpeg"
import amit from "../assets/images/amit_mayedo.jpeg"
import bhavesh from "../assets/images/bhavesh_vora.jpeg"
import bhupendra from "../assets/images/bhupendra_gandhi.jpeg"

export const doctors = [
  {
    name: 'Dr. Abhay Nene',
    specialty: 'Orthopedics',
    qualifications: 'MBBS, M.S. (Ortho)',
    experience: '20+ Years Experience',
    years: 20,
    focus: 'Complex spine and joint reconstruction.',
    image: abhay,
  },
  {
    name: 'Dr. Ajit R Menon',
    specialty: 'Cardiology',
    qualifications: 'MD, DM Cardiology',
    experience: '15+ Years Experience',
    years: 15,
    focus: 'Interventional cardiology and second opinions.',
    image: ajit,
  },
  {
    name: 'Dr. Amit Maydeo',
    specialty: 'Gastroenterology',
    qualifications: 'MS, FASGE, FJGES',
    experience: '15+ Years Experience',
    years: 15,
    focus: 'Advanced endoscopic diagnosis and treatment.',
    image: amit,
  },
  {
    name: 'Dr. Anand Nathwani',
    specialty: 'Gastroenterology',
    qualifications: 'MBBS, MD',
    experience: '20+ Years Experience',
    years: 20,
    focus: 'Digestive care and clinical review.',
    image: images.doctors[3],
  },
  {
    name: 'Dr. Bhavesh J. Vora',
    specialty: 'Nephrology',
    qualifications: 'MBBS, DM Nephrology',
    experience: '20+ Years Experience',
    years: 20,
    focus: 'Kidney care and chronic disease guidance.',
    image: bhavesh,
  },
  {
    name: 'Dr. Bhupendra Gandhi',
    specialty: 'Nephrology / Medicine',
    qualifications: 'MBBS, American Board (IM)',
    experience: '50+ Years Experience',
    years: 50,
    focus: 'Internal medicine and long-term clinical judgement.',
    image: bhupendra,
  },
]

export const specialties = ['All', 'Orthopedics', 'Cardiology', 'Gastroenterology', 'Nephrology']
