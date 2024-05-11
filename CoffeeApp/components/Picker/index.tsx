import { Picker as OriginPicker } from '@react-native-picker/picker';
import { View } from 'react-native';

type Props<T> = {
  value: T;
  setValue: (value: T) => void;
  items: readonly {
    label: string;
    value: string;
  }[];
};

export const Picker = <T,>({ value, setValue, items }: Props<T>) => (
  <View
    style={{
      borderColor: 'FFFFFF',
      borderWidth: 1,
      borderRadius: 5,
    }}
  >
    <OriginPicker
      style={{
        height: 44,
        width: 150,
        borderColor: 'FFFFFF',
        borderWidth: 1,
        borderRadius: 5,
      }}
      selectedValue={value}
      onValueChange={(itemValue) => setValue(itemValue)}
    >
      {items.map(({ label, value }) => (
        <OriginPicker.Item key={value} label={label} value={value} />
      ))}
    </OriginPicker>
  </View>
);
