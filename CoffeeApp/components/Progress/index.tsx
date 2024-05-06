import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  isActive: boolean;
  setNextIsActive: () => void;
  weight: number;
};

export const Progress = ({ isActive, setNextIsActive, weight }: Props) => {
  const [seconds, setSeconds] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const startTimeRef = useRef<number | null>(null);

  const totalSeconds = 42 as const;

  useEffect(() => {
    if (isActive && seconds < totalSeconds) {
      if (startTimeRef.current === null) startTimeRef.current = Date.now();
      // タイマーを開始
      intervalRef.current = setInterval(() => {
        setSeconds((Date.now() - startTimeRef.current!) / 1000);
      }, 10);
    } else if (seconds >= totalSeconds) {
      // タイマーを停止
      clearInterval(intervalRef.current);
      setSeconds(totalSeconds);
      setNextIsActive();
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, seconds]);

  const progressWidth = (seconds / totalSeconds) * 100;

  return (
    <View style={styles.column}>
      <Text>{weight}g</Text>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progressWidth}%` }]} />
      </View>
      <Text style={styles.timerText}>
        {seconds.toFixed(2)}/{totalSeconds} 秒
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  progressContainer: {
    height: 20,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3b5998',
    borderRadius: 10,
  },
  timerText: {
    fontSize: 24,
  },
});
