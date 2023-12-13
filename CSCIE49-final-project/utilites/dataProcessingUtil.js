
exports.processData = (results) => {
  results.sort((a, b) => new Date(b.public_release_date) - new Date(a.public_release_date));
  const thresholdDate = new Date();
  thresholdDate.setMonth(thresholdDate.getMonth() + 6);

  const proprietaryData = results.filter(data => new Date(data.public_release_date) > new Date() && new Date(data.public_release_date) <= thresholdDate);
  const publicData = results.filter(data => new Date(data.public_release_date) <= new Date() || new Date(data.public_release_date) > thresholdDate);

  return { proprietaryData, publicData };
};
