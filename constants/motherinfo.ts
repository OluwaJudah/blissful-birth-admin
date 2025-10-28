export const medicalHistoryFormData: any[] = [
  {
    name: "details",
    label: "Details",
    placeholder: "Please enter the medical history detaiils here.",
  },
  {
    name: "medication",
    label: "Medication",
    placeholder: "Please enter the medications here.",
  },
  {
    name: "operations",
    label: "Operations",
    placeholder: "Please enter any operations here.",
  },
  {
    name: "allergies",
    label: "Allergies",
    placeholder: "Please enter any allergies here.",
  },
];

export const bloodResultsSelectFormData = [
  {
    name: "rpr",
    label: "RPR (Syphilis Test)",
    placeholder: "Select RPR",
  },
  {
    name: "bloodGroup",
    label: "Blood group(Rhesus) - Rh factor",
    placeholder: "Select Blood group",
  },
  {
    name: "hepatitis",
    label: "Hepatitis",
    placeholder: "Select Hepatitis",
  },
  {
    name: "rubella",
    label: "Rubella",
    placeholder: "Select Rubella",
  },
  {
    name: "hiv",
    label: "HIV",
    placeholder: "Select HIV status",
  },
];

export const bloodInputFormData: any[] = [
  {
    name: "glucose",
    label: "Glucose (mmol/l)",
    type: "number",
    placeholder: "Please enter the glucose value",
  },
  {
    name: "hb",
    label: "Hb (g/dl)",
    type: "number",
    placeholder: "Please enter the hb value",
  },
];

export const updateMotherInfoFormData: any[] = [
  {
    name: "g",
    label: "G (Gravida)",
    type: "number",
    placeholder: "Please enter the G value",
  },
  {
    name: "p",
    label: "P (Parity)",
    type: "number",
    placeholder: "Please enter the P value",
  },
  {
    name: "age",
    label: "Age",
    type: "number",
    placeholder: "Please enter the age",
  },
  {
    name: "scanDate",
    label: "Scan Date",
    type: "date",
    placeholder: "Please enter the scan date",
  },
  {
    name: "scanGestationalAge",
    label: "Scan Gestation Age",
    placeholder: "Please enter the scan gestational date",
  },
  {
    name: "lastMenstrualDate",
    label: "Last Menstrual Date",
    type: "date",
    placeholder: "Please enter the last menstrual date",
  },
];

export const packageTypeOptions = [
  { label: "Antenatal", value: "anc" },
  { label: "Full Package", value: "full" },
];

export const scanInputForm: any[] = [
  {
    name: "date",
    label: "Date of Scan",
    type: "date",
    placeholder: "",
  },
  {
    name: "gestational_age",
    label: "Gestational Age(weeks)",
    type: "number",
    placeholder: "Eg. 21",
  },
  {
    name: "scan_gestation",
    label: "Scan Gestational",
    type: "text",
    placeholder: "Eg. 2Eg. 23 weeks 4 days",
  },
];

export const scanTextAreaForm: any[] = [
  {
    name: "outcome",
    label: "Scan Outcome",
    placeholder: "Please enter scan outcome here.",
  },
  {
    name: "warning",
    label: "Warning",
    placeholder: "Please enter warning here.",
  },
];
