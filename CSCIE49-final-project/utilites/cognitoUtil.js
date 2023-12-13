// Checks if the decoded JWT contains a group membership
exports.isUserInGroup = (decodedToken, groupName) => {
    const groups = decodedToken['cognito:groups'] || [];
    return groups.includes(groupName);
};