import {storage} from "@vendetta/plugin";
import {useProxy} from "@vendetta/storage";
import {Forms, General} from "@vendetta/ui/components";
const { FormText } = Forms;
const {ScrollView} = General;
const {FormSwitchRow} = Forms;
import {ReactNative, FluxDispatcher} from "@vendetta/metro/common";
const {View} = ReactNative;
export default function MoyaiSettings() {
  useProxy(storage);

  return (
    <><ScrollView style={{ flex: 1 }}>
      <FormSwitchRow
        label="Play on reactions :O"
        value={storage.allowReactions ?? true}
        onValueChange={(value: boolean) => {
          storage.allowReactions = value;
        } } 
        style={{ marginBottom: 20, marginTop: 20 }}
        />
    
        <View style={{ height: 1, backgroundColor: '#ccc', marginVertical: 10 }} />
        <Forms.FormInput
          title="🗿 Custom Sound URL"
          placeholder="https://github.com/SkyDotBit/moyai-fix/raw/refs/heads/main/thud.mp3"
          onChangeText={(x: string) => storage.customUrl = x}
          style={{ marginTop: 20, marginHorizontal: 12, marginVertical: 10 }} />
        <View style={{ height: 1, backgroundColor: '#ccc', marginVertical: 10 }} />
        <Forms.FormInput
          title="🗿 Custom emoji (Does not support Nitro emojis/FreeNitro emojis)"
          placeholder="🗿"
          onChangeText={(x: string) => storage.customEmoji = x}
          style={{ marginTop: 20, marginHorizontal: 12, marginVertical: 10 }} />
        <View style={{ height: 1, backgroundColor: '#ccc', marginVertical: 10 }} />
        <FormSwitchRow
          label="Ignore silent mode"
          value={storage.ignoreSilent ?? false}
          onValueChange={(value: boolean) => {
            storage.ignoreSilent = value;
          } } 
          style={{ marginBottom: 20 }}
        />

      </ScrollView></>
  );
}
