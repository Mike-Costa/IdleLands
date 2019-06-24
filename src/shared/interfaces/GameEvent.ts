import { ServerEventName } from './ServerEvent';

export interface GameEvent {
  name: ServerEventName;
  data: any;
}

export enum Channel {

  // party create, remove, modify
  Party = 'party',

  // receive/send an event from the server
  PlayerAdventureLog = 'eventMessage',

  // used to send/receive player chat messages
  PlayerChat = 'playerChat',

  // used to communicate updates to clients
  PlayerUpdates = 'playerUpdates',

  // internal: used to sync player add/remove between servers
  Players = 'players'
}
