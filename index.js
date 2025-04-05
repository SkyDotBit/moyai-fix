(function(l,t,C,a,b,o){"use strict";const{FormText:D}=o.Forms,{ScrollView:T}=o.General,{FormSwitchRow:h}=o.Forms,{View:u}=a.ReactNative;function p(){return b.useProxy(t.storage),React.createElement(React.Fragment,null,React.createElement(T,{style:{flex:1}},React.createElement(h,{label:"Play on reactions :O",value:t.storage.allowReactions??!0,onValueChange:function(e){t.storage.allowReactions=e},style:{marginBottom:20,marginTop:20}}),React.createElement(u,{style:{height:1,backgroundColor:"#ccc",marginVertical:10}}),React.createElement(o.Forms.FormInput,{title:"\u{1F5FF} Custom Sound URL",placeholder:"https://github.com/SkyDotBit/moyai-fix/raw/refs/heads/main/thud.mp3",onChangeText:function(e){return t.storage.customUrl=e},style:{marginTop:20,marginHorizontal:12,marginVertical:10}}),React.createElement(u,{style:{height:1,backgroundColor:"#ccc",marginVertical:10}}),React.createElement(o.Forms.FormInput,{title:"\u{1F5FF} Custom emoji (Does not support Nitro emojis/FreeNitro emojis)",placeholder:"\u{1F5FF}",onChangeText:function(e){return t.storage.customEmoji=e},style:{marginTop:20,marginHorizontal:12,marginVertical:10}}),React.createElement(u,{style:{height:1,backgroundColor:"#ccc",marginVertical:10}}),React.createElement(h,{label:"Ignore silent mode",value:t.storage.ignoreSilent??!1,onValueChange:function(e){t.storage.ignoreSilent=e},style:{marginBottom:20}}),React.createElement(D,{style:{marginTop:20}},"You will need to restart Discord for changes to take place.")))}const{DCDSoundManager:n}=a.ReactNative.NativeModules,d=C.findByStoreName("SelectedChannelStore");if(t.storage.ignoreSilent??!1)try{n.setCategory("Playback",!0)}catch(e){console.error(e)}let f="https://github.com/SkyDotBit/moyai-fix/raw/refs/heads/main/thud.mp3";t.storage.customUrl&&(f=t.storage.customUrl);let m="\u{1F5FF}";t.storage.customEmoji&&(m=t.storage.customEmoji);const i=6969;let E=-1;const v=function(){return new Promise(function(e){return n.prepare(f,"notification",i,function(s,r){return e(r)})})};let g=null,c=!1;async function F(){c&&(g!=null&&clearTimeout(g),n.stop(i),c=!1),c=!0,await n.play(i),setTimeout(function(){c=!1,n.stop(i),g=null},E)}function y(e){if(e.message.content&&e.channelId==d.getChannelId()&&!e.message.state&&e.sendMessageOptions==null){let s=(e.message.content.match(m)??[]).length;if(s+=(e.message.content.match(/<a?:.*?moy?ai.*?:.+?>/gi)??[]).length,s>0)for(let r=0;r<s;r++)setTimeout(F,r*350)}}function R(e){(t.storage.allowReactions??!0)&&e.channelId==d.getChannelId()&&(e.emoji.name==m||e.emoji.name.match(/.*?moy?ai.*?/i))&&!e.optimistic&&F()}let S=!1;var w={onLoad:function(){S||v().then(function(e){S=!0,E=e.duration}),a.FluxDispatcher.subscribe("MESSAGE_CREATE",y),a.FluxDispatcher.subscribe("MESSAGE_REACTION_ADD",R)},onUnload:function(){a.FluxDispatcher.unsubscribe("MESSAGE_CREATE",y),a.FluxDispatcher.unsubscribe("MESSAGE_REACTION_ADD",R)},settings:p};return l.default=w,Object.defineProperty(l,"__esModule",{value:!0}),l})({},vendetta.plugin,vendetta.metro,vendetta.metro.common,vendetta.storage,vendetta.ui.components);
