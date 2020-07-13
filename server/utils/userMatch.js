function userMatch(userItem) {
  bcrypt.compare(password, userItem.password).then((result) => {
    if (result) {
      return resolve();
    } else {
      return reject();
    }
  });
}
