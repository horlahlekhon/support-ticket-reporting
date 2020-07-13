const roles = ['customer', 'admin', 'support-agent'];

const roleRights = new Map();
roleRights.set(roles[0], ['canComment', 'getSelf']);
roleRights.set(roles[1], ['getUsers', 'manageUsers', 'getSelf', 'manageSupportTickets']);
roleRights.set(roles[2], ['canComment', 'getSelf', 'manageSupportTickets'])

module.exports = {
    roles,
    roleRights,
};