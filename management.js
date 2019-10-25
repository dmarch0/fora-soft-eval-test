class RoomManager {
  constructor() {
    if (RoomManager.exists) {
      return RoomManager.instance;
    }
    this.rooms = {};
    RoomManager.exists = true;
    RoomManager.instance = this;
    return this;
  }

  getRoom(id) {
    if (id in this.rooms) {
      return this.rooms[id];
    } else {
      return false;
    }
  }

  registerRoom(id) {
    this.rooms[id] = [];
    return this.rooms[id];
  }

  connectUser(id, userId, username) {
    this.rooms[id].push({ userId, username });
    return this.rooms[id];
  }

  disconnectUser(id, userIdToDisconnect) {
    this.rooms[id] = this.rooms[id].filter(
      user => user.userId !== userIdToDisconnect
    );
    if (this.rooms[id].length === 0) {
      delete this.rooms[id];
    }
    return this.rooms[id];
  }
}

module.exports = RoomManager;
