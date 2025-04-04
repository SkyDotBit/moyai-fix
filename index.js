(function(c,t,R,a,w,n){"use strict";const{FormText:u}=n.Forms,{ScrollView:C}=n.General,{FormSwitchRow:D}=n.Forms;function b(){return w.useProxy(t.storage),React.createElement(C,{style:{flex:1}},React.createElement(D,{label:"Play on reactions :O",value:t.storage.allowReactions??!0,onValueChange:function(e){t.storage.allowReactions=e}}),React.createElement(u,null),React.createElement(n.Forms.FormInput,{title:"\u{1F5FF} Custom Sound URL",placeholder:"https://github.com/SkyDotBit/moyai-fix/raw/refs/heads/main/thud.mp3",onChangeText:function(e){return t.storage.customUrl=e},style:{marginTop:-25,marginHorizontal:12}}),React.createElement(u,null),React.createElement(n.Forms.FormInput,{title:"\u{1F5FF} Custom emoji (Won't always work)",placeholder:"\u{1F5FF}",onChangeText:function(e){return t.storage.customEmoji=e},style:{marginTop:-25,marginHorizontal:12}}),React.createElement(u,null,"You will need to restart Discord for changes to take place."))}const{DCDSoundManager:r}=a.ReactNative.NativeModules,h=R.findByStoreName("SelectedChannelStore");let f="https://github.com/SkyDotBit/moyai-fix/raw/refs/heads/main/thud.mp3";t.storage.customUrl&&(f=t.storage.customUrl);let m="\u{1F5FF}";t.storage.customEmoji&&(m=t.storage.customEmoji);const s=6969;let g=-1;const T=function(){return new Promise(function(e){return r.prepare(f,"notification",s,function(l,o){return e(o)})})};let d=null,i=!1;async function E(){i&&(d!=null&&clearTimeout(d),r.stop(s),i=!1),i=!0,await r.play(s),setTimeout(function(){i=!1,r.stop(s),d=null},g)}function F(e){if(e.message.content&&e.channelId==h.getChannelId()&&!e.message.state&&e.sendMessageOptions==null){let l=(e.message.content.match(m)??[]).length;if(l+=(e.message.content.match(/<a?:.*?moy?ai.*?:.+?>/gi)??[]).length,l>0)for(let o=0;o<l;o++)setTimeout(E,o*350)}}function S(e){(t.storage.allowReactions??!0)&&e.channelId==h.getChannelId()&&(e.emoji.name==m||e.emoji.name.match(/.*?moy?ai.*?/i))&&!e.optimistic&&E()}let y=!1;var p={onLoad:function(){y||T().then(function(e){y=!0,g=e.duration}),a.FluxDispatcher.subscribe("MESSAGE_CREATE",F),a.FluxDispatcher.subscribe("MESSAGE_REACTION_ADD",S)},onUnload:function(){a.FluxDispatcher.unsubscribe("MESSAGE_CREATE",F),a.FluxDispatcher.unsubscribe("MESSAGE_REACTION_ADD",S)},settings:b};return c.default=p,Object.defineProperty(c,"__esModule",{value:!0}),c})({},vendetta.plugin,vendetta.metro,vendetta.metro.common,vendetta.storage,vendetta.ui.components);
