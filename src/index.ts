import {storage} from "@vendetta/plugin";
import {findByStoreName, findByProps} from "@vendetta/metro";
import {ReactNative, FluxDispatcher} from "@vendetta/metro/common";
import MoyaiSettings from "./settings";

const {DCDSoundManager} = ReactNative.NativeModules;
const SelectedChannelStore = findByStoreName("SelectedChannelStore");

let THUD_URL =
  "https://raw.githubusercontent.com/Metastruct/garrysmod-chatsounds/master/sound/chatsounds/autoadd/memes/overused%20thud.ogg";
if (storage.customUrl) {
  THUD_URL = storage.customUrl;
  
}
const SOUND_ID = 6969;
let SOUND_DURATION = -1;

const prepareSound = () =>
  new Promise((resolve) =>
    DCDSoundManager.prepare(THUD_URL, "notification", SOUND_ID, (_, meta) =>
      resolve(meta)
    )
  );
let playingTimeout: number | null = null;
let playing = false;
async function playSound() {
  if (playing) {
    if (playingTimeout != null) clearTimeout(playingTimeout);
    DCDSoundManager.stop(SOUND_ID);
    playing = false;
  }
  playing = true;
  await DCDSoundManager.play(SOUND_ID);
  
    setTimeout(() => {
    playing = false;
    DCDSoundManager.stop(SOUND_ID);
    playingTimeout = null;
  }, SOUND_DURATION);
}

function onMessage(event) {
  if (
    event.message.content &&
    event.channelId == SelectedChannelStore.getChannelId() &&
    !event.message.state &&
    event.sendMessageOptions == undefined
  ) {
    let count = (event.message.content.match(/🗿/g) ?? []).length;
    count += (event.message.content.match(/<a?:.*?moy?ai.*?:.+?>/gi) ?? [])
      .length;
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        setTimeout(playSound, i * 350);
      }
    }
  }
}

function onReaction(event) {
  if (
    (storage.allowReactions ?? true) &&
    event.channelId == SelectedChannelStore.getChannelId() &&
    (event.emoji.name == "🗿" || event.emoji.name.match(/.*?moy?ai.*?/i)) &&
    !event.optimistic
  ) {
    playSound();
  }
}

let soundPrepared = false;

export default {
  onLoad: () => {
    if (!soundPrepared) {
      prepareSound().then((meta: Record<string, number>) => {
        soundPrepared = true;
        SOUND_DURATION = meta.duration;
      });
    }
    FluxDispatcher.subscribe("MESSAGE_CREATE", onMessage);
    FluxDispatcher.subscribe("MESSAGE_REACTION_ADD", onReaction);
  },
  onUnload: () => {
    FluxDispatcher.unsubscribe("MESSAGE_CREATE", onMessage);
    FluxDispatcher.unsubscribe("MESSAGE_REACTION_ADD", onReaction);
  },
  settings: MoyaiSettings,
};
