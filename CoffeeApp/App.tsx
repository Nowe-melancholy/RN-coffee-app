import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Progress } from './components/Progress';

export default function App() {
  const [firstIsActive, setFirstIsActive] = useState(false);
  const [secondIsActive, setSecondIsActive] = useState(false);
  const [thirdIsActive, setThirdIsActive] = useState(false);
  const [fourthIsActive, setFourthIsActive] = useState(false);
  const [fifthIsActive, setFifthIsActive] = useState(false);

  const toggle = () => setFirstIsActive((prev) => !prev);

  return (
    <View style={styles.container}>
      <Progress
        isActive={firstIsActive}
        setNextIsActive={() => setSecondIsActive(true)}
        weight={30}
      />
      <Progress
        isActive={secondIsActive}
        setNextIsActive={() => setThirdIsActive(true)}
        weight={60}
      />
      <Progress
        isActive={thirdIsActive}
        setNextIsActive={() => setFourthIsActive(true)}
        weight={90}
      />
      <Progress
        isActive={fourthIsActive}
        setNextIsActive={() => setFifthIsActive(true)}
        weight={120}
      />
      <Progress
        isActive={fifthIsActive}
        setNextIsActive={() => {}}
        weight={150}
      />
      <Button onPress={toggle} title={firstIsActive ? 'Stop' : 'Start'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
