// translations.js
const translations = {
  ocr_inprogress: 'OCR in Progress',
  //bug in be this line will be not needed when be fixed
  ocr_inprogess: 'OCR in Progress',
  ocr_completed: 'OCR Capture Completed',
  // Add more translations as needed
};

export const translateStatus = (status) => {
  return translations[status] || status.toUpperCase();
};
