import {storage} from "@vendetta/plugin";
import {findByStoreName, findByProps} from "@vendetta/metro";
import {ReactNative, FluxDispatcher} from "@vendetta/metro/common";
import MoyaiSettings from "./settings";
import { MobileAudioSound } from './deps'; // Thank you Nexpid for this <3

const {DCDSoundManager} = ReactNative.NativeModules;
const SelectedChannelStore = findByStoreName("SelectedChannelStore");
if (storage.ignoreSilent ?? false) {
  try {
    DCDSoundManager.setCategory('Playback', true);
  } catch (error) {
    console.error(error + "This is an old version of the code thing please know that this is not something you should worry about I was just too lazy to remove it - Sky.Bit");
  }
  
}

const soundId = 6969;
let soundDuration = -1;

let THUD_URL =
  "https://github.com/SkyDotBit/moyai-fix/raw/refs/heads/main/thud.mp3"; // Support for iOS :D
if (storage.customUrl) {
  THUD_URL = storage.customUrl;
  
}
let notificationSound = new MobileAudioSound(
  'https://github.com/SkyDotBit/moyai-fix/raw/refs/heads/main/thud.mp3',  
  'media',                                  
  1.0,                                             
  {
    onPlay: () => console.log('Audio started playing'),
    onStop: () => console.log('Audio stopped'),
    onEnd: () => console.log('Audio finished'),
    onLoad: (loaded) => console.log('Audio loaded:', loaded),
  }
);

let emoji = "🗿";
if (storage.customEmoji) {
  emoji = storage.customEmoji;
}
const SOUND_ID = 6969;
let SOUND_DURATION = -1;

const prepareSound = () =>
  new Promise((resolve) => {
    console.log("Hi");
    if (storage.ignoreSilent ?? false) {
      if (storage.customUrl) {
        console.log("There is a custom URL")
        let notificationSound = new MobileAudioSound(
          storage.customUrl,  
          'media',                                  
          1.0,                                             
          {
            onPlay: () => console.log('Audio started playing'),
            onStop: () => console.log('Audio stopped'),
            onEnd: () => console.log('Audio finished'),
            onLoad: (loaded) => console.log('Audio loaded:', loaded),
          }
        );
      }
    
    } else {
      DCDSoundManager.prepare(THUD_URL, "notification", SOUND_ID, (_, meta) =>
        resolve(meta)
      );
    }
  });

  
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
let timeoutId = null;
let isPlaying = false;
async function playSoundsil() {
  notificationSound.play();
}
let isPrepared = false;
function playSounds() {
  prepareSound()
  if (storage.ignoreSilent ?? false) {
    playSoundsil()
  } else {
    playSound()
  }
}
function onMessage(event) {
  if (
    event.message.content &&
    event.channelId == SelectedChannelStore.getChannelId() &&
    !event.message.state &&
    event.sendMessageOptions == undefined
  ) {
    let count = (event.message.content.match(emoji) ?? []).length;
    count += (event.message.content.match(/<a?:.*?moy?ai.*?:.+?>/gi) ?? [])
      .length;
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        
        
        setTimeout(playSounds, i * 350);
        
        
      }
    }
  }
}

function onReaction(event) {
  if (
    (storage.allowReactions ?? true) &&
    event.channelId == SelectedChannelStore.getChannelId() &&
    (event.emoji.name == emoji || event.emoji.name.match(/.*?moy?ai.*?/i)) &&
    !event.optimistic
  ) {
    
    
    playSounds();
    
  }
}

let soundPrepared = false;

export default {
  onLoad: () => {
    if (!soundPrepared) {
      prepareSound().then((meta: Record<string, number>) => {
        soundPrepared = true;
        SOUND_DURATION = meta.duration;
        isPrepared = true;
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
