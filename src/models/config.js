const roles = ['customer', 'admin', 'support-agent'];

const roleRights = new Map();
roleRights.set(roles[0], ['canComment']);
roleRights.set(roles[1], ['getUsers', 'manageUsers']);
roleRights.set(roles[2], ['canComment'])

module.exports = {
    roles,
    roleRights,
};