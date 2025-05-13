export const COMPLETED_APPOINTMENT = "completed";
export const PENDING_APPOINTMENT = "pending";
export const APPOINTMENT = "appointment";
export const PATIENT_ONBOARDED = "onboarded";
export const MAX_PER_SLOT = 4;
export const SLOT_TIMES = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
];
export const appointmentWeeks: any[] = [
  8, 13, 18, 21, 24, 28, 30, 32, 34, 36, 37, 38, 39, 40,
];

export const defaultValueMotherReportForm = {
  id: "",
  motherWeight: 0,
  motherBloodPressure: "",
  motherPulse: 0,
  motherLeucosite: "",
  motherGlucose: "",
  motherProtein: "",
  motherPalpation: 0,
  motherFh: 0,
  motherNote: "",
};

export const defaultValueBabyReportForm = {
  id: "",
  babyHeight: 0,
  babyHeartRate: 0,
  babyPresentation: "",
  babyPosition: "",
  babyNote: "",
};

export const motherReportFormData: any[] = [
  {
    name: "motherWeight",
    label: "Weight (kg)",
    type: "number",
    placeholder: "Please enter the mother's weight in kilograms",
  },
  {
    name: "motherPulse",
    label: "Pulse (bpm)",
    type: "number",
    placeholder: "Please enter the mother's weight in kilograms",
  },
  {
    name: "motherBloodPressure",
    label: "Blood Pressure (mm/Hg)",
    placeholder: "Please enter the mother's pressure in mmHg. E.g 120/80",
  },
];

export const motherReportOtherFormData = [
  {
    name: "motherPalpation",
    label: "Palpation (l)",
    type: "number",
    placeholder: "Please enter the mother's palpation in litres",
  },
  {
    name: "motherFh",
    label: "FH",
    type: "number",
    placeholder: "Please enter the mother's pressure in centimeters",
  },
];

export const urineOptions = [
  { label: "Clear", value: "clear" },
  { label: "Trace", value: "trace" },
  { label: "+1", value: "+1" },
  { label: "+2", value: "+2" },
  { label: "+3", value: "+3" },
];

export const motherReportSelectFormData = [
  {
    name: "motherLeucosite",
    label: "Leucosite (L)",
    placeholder: "Select Urine Leucosite value",
  },
  {
    name: "motherGlucose",
    label: "Glucose (G)",
    placeholder: "Select Urine Glucose value",
  },
  {
    name: "motherProtein",
    label: "Protein (P)",
    placeholder: "Select Urine Protein value",
  },
];

export const babyReportSelectFormData = [
  {
    name: "babyPresentation",
    label: "Presentation",
    placeholder: "Select Baby Presentation",
    options: [
      { label: "Vertex", value: "vertex" },
      { label: "Breech", value: "breech" },
      { label: "Transverse", value: "transverse" },
      { label: "Unsure", value: "unsure" },
    ],
  },
  {
    name: "motherPosition",
    label: "Position",
    placeholder: "Select Baby Position",
    options: [
      { label: "LOA", value: "loa" },
      { label: "ROA", value: "roa" },
      { label: "Posterior", value: "posterior" },
      { label: "Unsure", value: "unsure" },
    ],
  },
];

export const babyReportFormData: any[] = [
  {
    name: "babyHeight",
    label: "SFH(Height) (cm)",
    type: "number",
    placeholder: "Please enter the baby's height in centimetres",
  },
  {
    name: "babyHeartRate",
    label: "SFH(Heart Rate) (bpm)",
    type: "number",
    placeholder: "Please enter the baby's heart rate in bpm",
  },
];

export const timeSlotOptions = [
  { label: "9:00", value: "9:00" },
  { label: "9:30", value: "9:30" },
  { label: "10:00", value: "10:00" },
  { label: "10:30", value: "10:30" },
  { label: "11:00", value: "11:00" },
  { label: "11:30", value: "11:30" },
  { label: "12:00", value: "12:00" },
  { label: "12:30", value: "12:30" },
  { label: "13:00", value: "13:00" },
  { label: "13:30", value: "13:30" },
  { label: "14:00", value: "14:00" },
  { label: "14:30", value: "14:30" },
  { label: "15:00", value: "15:00" },
  { label: "15:30", value: "15:30" },
  { label: "16:00", value: "16:00" },
];
