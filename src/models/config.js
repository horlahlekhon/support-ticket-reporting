const roles = ['customer', 'admin', 'support-agent'];

const roleRights = new Map();
roleRights.set(roles[0], ['canComment', 'getSelf', 'createSupportRequest', 'getRequest', 'modifyRequest']);
roleRights.set(roles[1], ['getUsers', 'manageUsers', 'getSelf', 'manageSupportTickets', 'getRequest']);
roleRights.set(roles[2], ['canComment', 'getSelf', 'manageSupportTickets', 'getRequest'])
const requestStatus = {
    closed: 'CLOSED',
    inProcessing: 'WAITING',
    pending: 'PENDING'
}

module.exports = {
    roles,
    roleRights,
    requestStatus
};