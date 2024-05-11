import { useState } from 'react';
import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Progress } from './components/Progress';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import { Picker } from './components/Picker';
import { match } from 'ts-pattern';

export default function App() {
  const [firstIsActive, setFirstIsActive] = useState(false);
  const [secondIsActive, setSecondIsActive] = useState(false);
  const [thirdIsActive, setThirdIsActive] = useState(false);
  const [fourthIsActive, setFourthIsActive] = useState(false);
  const [fifthIsActive, setFifthIsActive] = useState(false);

  const toggle = () => {
    if (!firstIsActive) {
      setFirstIsActive(true);
    } else {
      setFirstIsActive(false);
      setSecondIsActive(false);
      setThirdIsActive(false);
      setFourthIsActive(false);
      setFifthIsActive(false);
    }
  };

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleExpanded = () => {
    setIsCollapsed(!isCollapsed);
  };

  const [beansWeight, setBeansWeight] = useState('12');

  const Taste = [
    { label: '普通', value: 'normal' },
    { label: '甘め', value: 'sweety' },
    { label: '明るめ', value: 'brighter' },
  ] as const;
  const [taste, setTaste] = useState<(typeof Taste)[number]['value']>('normal');

  const Concentration = [
    { label: '普通', value: 'normal' },
    { label: '薄め', value: 'weak' },
  ] as const;
  const [concentration, setConcentration] =
    useState<(typeof Concentration)[number]['value']>('normal');

  const allWaterWeight = Number(beansWeight) * 15;
  const fourtyWaterWeight = allWaterWeight * 0.4;
  const sixtyWaterWeight = allWaterWeight * 0.6;

  const { firstWaterWeight, secondWaterWeight } = match(taste)
    .with('normal', () => ({
      firstWaterWeight: fourtyWaterWeight * 0.5,
      secondWaterWeight: fourtyWaterWeight * 0.5,
    }))
    .with('sweety', () => ({
      firstWaterWeight: (fourtyWaterWeight * 5) / 12,
      secondWaterWeight: (fourtyWaterWeight * 7) / 12,
    }))
    .with('brighter', () => ({
      firstWaterWeight: (fourtyWaterWeight * 7) / 12,
      secondWaterWeight: (fourtyWaterWeight * 5) / 12,
    }))
    .exhaustive();

  const { thirdWaterWeight, fourthWaterWeight, fifthWaterWeight } = match(
    concentration
  )
    .with('normal', () => ({
      thirdWaterWeight: sixtyWaterWeight / 3,
      fourthWaterWeight: sixtyWaterWeight / 3,
      fifthWaterWeight: sixtyWaterWeight / 3,
    }))
    .with('weak', () => ({
      thirdWaterWeight: sixtyWaterWeight / 2,
      fourthWaterWeight: sixtyWaterWeight / 2,
      fifthWaterWeight: 0,
    }))
    .exhaustive();

  const isFifth = fifthWaterWeight !== 0;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, marginTop: 50, marginLeft: 20, marginRight: 20 }}
      behavior='height'
    >
      <View style={{ width: '100%', borderRadius: 5 }}>
        <TouchableOpacity
          onPress={toggleExpanded}
          style={{
            width: '100%',
            backgroundColor: '#3b5998',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            height: 40,
          }}
        >
          <Animatable.Text
            animation='fadeIn'
            style={{
              color: '#fff',
              fontSize: 18,
            }}
          >
            設定
          </Animatable.Text>
        </TouchableOpacity>
        <Collapsible
          collapsed={isCollapsed}
          duration={300}
          style={{ width: '100%' }}
        >
          <Animatable.View
            animation='fadeIn'
            duration={500}
            style={{
              height: 300,
              flexDirection: 'column',
              gap: 20,
              backgroundColor: '#f9f9f9',
              borderWidth: 1,
              borderColor: '#ddd',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>コーヒー豆の量：</Text>
              <TextInput
                value={beansWeight}
                onChangeText={setBeansWeight}
                keyboardType='numeric'
                style={{
                  height: 40,
                  width: 60,
                  margin: 12,
                  borderWidth: 1,
                  padding: 10,
                }}
              />
              <Text>g</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 30,
              }}
            >
              <Text>味:</Text>
              <Picker value={taste} setValue={setTaste} items={Taste} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 30,
              }}
            >
              <Text>濃さ:</Text>
              <Picker
                value={concentration}
                setValue={setConcentration}
                items={Concentration}
              />
            </View>
          </Animatable.View>
        </Collapsible>
      </View>

      <View style={{ gap: 30 }}>
        <Progress
          isActive={firstIsActive}
          setNextIsActive={() => setSecondIsActive(true)}
          weight={firstWaterWeight}
        />
        <Progress
          isActive={secondIsActive}
          setNextIsActive={() => setThirdIsActive(true)}
          weight={firstWaterWeight + secondWaterWeight}
        />
        <Progress
          isActive={thirdIsActive}
          setNextIsActive={() => setFourthIsActive(true)}
          weight={firstWaterWeight + secondWaterWeight + thirdWaterWeight}
        />
        <Progress
          isActive={fourthIsActive}
          setNextIsActive={() => (isFifth ? setFifthIsActive(true) : {})}
          weight={
            firstWaterWeight +
            secondWaterWeight +
            thirdWaterWeight +
            fourthWaterWeight
          }
        />
        {isFifth && (
          <Progress
            isActive={fifthIsActive}
            setNextIsActive={() => {}}
            weight={
              firstWaterWeight +
              secondWaterWeight +
              thirdWaterWeight +
              fourthWaterWeight +
              fifthWaterWeight
            }
          />
        )}
      </View>
      <Button onPress={toggle} title={firstIsActive ? 'Reset' : 'Start'} />
    </KeyboardAvoidingView>
  );
}
