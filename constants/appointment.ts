export const COMPLETED_APPOINTMENT = "completed";
export const defaultValueMotherReportForm = {
  _id: "",
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
  _id: "",
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
    placeholder: "Please enter the mother's pulse in bpm",
  },
  {
    name: "motherBloodPressure",
    label: "Blood Pressure (mm/Hg)",
    placeholder: "Please enter the mother's blood pressure in mmHg. E.g 120/80",
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
