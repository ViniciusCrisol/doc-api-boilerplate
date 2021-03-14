import path from 'path';
import databse from '../utils/fake_database';

function joinTemplatePath(fileName) {
  return path.join(__dirname, '..', 'views', 'emails', fileName);
}

function getEmailTemplate(type) {
  switch (type) {
    case 'welcome':
      return joinTemplatePath('welcome.ejs');
    case 'change-password':
      return joinTemplatePath('change-password.ejs');
    default:
      return undefined;
  }
}

function getEmailConfig(type) {
  switch (type) {
    case 'welcome':
      return {
        from: 'email@hotmail.com',
        subject: '<no-reply> Hello, welcome!',
      };
    case 'change-password':
      return {
        from: 'email@hotmail.com',
        subject: '<no-reply> Change your password.',
      };
    default:
      return undefined;
  }
}

function getEmailData(userId, type) {
  function getWelcomeData() {
    const userInfo = databse.find((user) => user.id === userId);
    if (!userInfo) return undefined;

    const { name, id, email } = userInfo;
    return { name, id, email };
  }

  function getChangePasswordData() {
    const userInfo = databse.find((user) => user.id === userId);
    if (!userInfo) return undefined;

    const { name, password_hash } = userInfo;
    return { name, password: password_hash };
  }

  switch (type) {
    case 'welcome':
      return getWelcomeData();
    case 'change-password':
      return getChangePasswordData();
    default:
      return undefined;
  }
}

export { getEmailConfig, getEmailData, getEmailTemplate };
