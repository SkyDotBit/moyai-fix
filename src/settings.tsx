import {storage} from "@vendetta/plugin";
import {useProxy} from "@vendetta/storage";
import {Forms, General} from "@vendetta/ui/components";
const {ScrollView} = General;
const {FormSwitchRow} = Forms;

export default function MoyaiSettings() {
  useProxy(storage);

  return (
    <ScrollView style={{flex: 1}}>
      <FormSwitchRow
        label="Play on reactions"
        value={storage.allowReactions ?? true}
        onValueChange={(value: boolean) => {
          storage.allowReactions = value;
        }}
      />
      <Forms.FormInput
        title="Sound URL (Optional)"
        placeholder="https://raw.githubusercontent.com/Metastruct/garrysmod-chatsounds/master/sound/chatsounds/autoadd/memes/overused%20thud.ogg"
        onChange={( x: string ) => storage.customUrl = x}
        style={{ marginTop: -25, marginHorizontal: 12 }}
      />
    </ScrollView>
  );
}
