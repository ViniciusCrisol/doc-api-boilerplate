import path from 'path';
import databse from '../utils/fake_database';

function getPdfUrl(data) {
  return `${process.env.BASE_URL}/pdf/${JSON.stringify(data)}`;
}

function joinTemplatePath(fileName) {
  return path.join(__dirname, '..', 'views', 'documents', fileName);
}

function getPdfTemplate(type) {
  switch (type) {
    case 'users-report':
      return joinTemplatePath('report.ejs');
    case 'error-template':
      return joinTemplatePath('error.ejs');
    default:
      return undefined;
  }
}

function getPdfData(userId, type) {
  function getUserReportData() {
    const data = databse.find((user) => user.id === userId);
    if (!data) return undefined;

    const { name, id } = data;
    return { name, id };
  }

  switch (type) {
    case 'users-report':
      return getUserReportData();
    default:
      return undefined;
  }
}

export { getPdfUrl, getPdfTemplate, getPdfData };
