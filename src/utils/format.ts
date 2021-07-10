export const formatDate = (date: string) => {
  const formattedDate = Intl.DateTimeFormat("pt-BR").format(new Date(date));
  return formattedDate;
};

export const formatDocument = (document: string) => {
  let newDocument = document;

  // Remove unwanted characters
  newDocument = document.replace(/[^\d]/g, "");

  // Do the format
  return newDocument.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export const removeDocumentMask = (document: string) => {
  let newDocument = document;

  // Remove unwanted characters
  newDocument = document.replace(/[^\d]/g, "");

  return newDocument;
};
