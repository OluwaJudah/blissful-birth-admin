export const COMPLETED_APPOINTMENT = "completed";
export const defaultValueMotherReportForm = {
  _id: "",
  motherWeight: 0,
  motherUrine: 0,
  motherPalpation: 0,
  motherBloodPressure: "",
  motherFh: 0,
  motherNote: "",
};

export const defaultValueBabyReportForm = {
  _id: "",
  babyWeight: 0,
  babyHeight: 0,
  babyHeartRate: 0,
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
    name: "motherUrine",
    label: "Urine (l)",
    type: "number",
    placeholder: "Please enter the mother's urine in litres",
  },
  {
    name: "motherPalpation",
    label: "Palpation (l)",
    type: "number",
    placeholder: "Please enter the mother's palpation in litres",
  },
  {
    name: "motherBloodPressure",
    label: "Blood Pressure (mm/Hg)",
    placeholder: "Please enter the mother's pressure in mmHg. E.g 120/80",
  },
  {
    name: "motherFh",
    label: "FH",
    type: "number",
    placeholder: "Please enter the mother's pressure in centimeters",
  },
];

export const babyReportFormData: any[] = [
  {
    name: "babyWeight",
    label: "Weight (kg)",
    type: "number",
    placeholder: "Please enter the baby's weight in kilograms",
  },
  {
    name: "babyHeight",
    label: "Height (cm)",
    type: "number",
    placeholder: "Please enter the baby's height in centimetres",
  },
  {
    name: "babyHeartRate",
    label: "Heart Rate (bpm)",
    type: "number",
    placeholder: "Please enter the baby's heart rate in bpm",
  },
];
