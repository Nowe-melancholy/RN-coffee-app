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
    }

    if (isActive && seconds >= totalSeconds) {
      // タイマーを停止
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
      startTimeRef.current = null;
      setSeconds(totalSeconds);
      setNextIsActive();
    }

    if (!isActive) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
      startTimeRef.current = null;
      setSeconds(0);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, seconds]);

  const progressWidth = (seconds / totalSeconds) * 100;

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Text
        style={{
          fontSize: 24,
        }}
      >
        {weight}g
      </Text>
      <View
        style={{
          height: 20,
          width: '100%',
          backgroundColor: '#e0e0e0',
          borderRadius: 10,
          overflow: 'hidden',
          marginBottom: 10,
        }}
      >
        <View
          style={[
            {
              height: '100%',
              backgroundColor: '#3b5998',
              borderRadius: 10,
            },
            { width: `${progressWidth}%` },
          ]}
        />
      </View>
      <Text
        style={{
          fontSize: 24,
        }}
      >
        {seconds.toFixed(2)}/{totalSeconds} 秒
      </Text>
    </View>
  );
};
