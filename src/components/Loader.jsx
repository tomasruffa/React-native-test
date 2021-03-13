import React from 'react'
import { Animated, View, Dimensions } from 'react-native';

const Loader = () => {
  const fadeAnim = React.useRef(new Animated.Value(1)).current
  const animated = React.useRef(new Animated.Value(0)).current
  const fadeAnim2 = React.useRef(new Animated.Value(1)).current
  const animated2 = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    Animated.stagger(500, [
        Animated.parallel([
          Animated.loop(
            Animated.timing(
              fadeAnim,
              {
                toValue: 0,
                duration: 5000,
                useNativeDriver: true
              }),{iterations: -1}
          ),
          Animated.loop(
            Animated.timing(
              animated,
              {
                toValue: 1,
                duration: 5000,
                useNativeDriver: true
              }),{iterations: -1}
          ),
        ]),
        Animated.parallel([
          Animated.loop(
            Animated.timing(
              fadeAnim2,
              {
                toValue: 0,
                duration: 5000,
                useNativeDriver: true
              }),{iterations: -1}
          ),
          Animated.loop(
            Animated.timing(
              animated2,
              {
                toValue: 1,
                duration: 5000,
                useNativeDriver: true
              }),{iterations: -1}
          ),
        ]),
    ]).start();
  }, [fadeAnim, animated])

  return (
    <View style={{position: 'relative', flex: 1 }}>
      <View style={{
        width: 15,
        height: 15,
        borderRadius: 50,
        backgroundColor: 'rgba(127,185,0,1)',
        position: 'absolute',
        zIndex:10,
        top: Dimensions.get('window').height / 2 - 7.5,
        left: Dimensions.get('window').width / 2 - 7.5
      }} />
      <Animated.View
        style={{
          opacity: fadeAnim,
          width: 150,
          height: 150,
          borderRadius: 75,
          backgroundColor: 'rgba(127,185,0,0.6)',
          position: 'absolute',
          top: Dimensions.get('window').height / 2 - 75,
          left: Dimensions.get('window').width / 2 - 75,
          transform: [
            {
              scale: animated,
            },
          ],
          zIndex:2
        }} />
      <Animated.View
        style={{
          opacity: fadeAnim2,
          width: 150,
          height: 150,
          borderRadius: 75,
          backgroundColor: 'rgba(127,185,0,0.4)',
          position: 'absolute',
          top: Dimensions.get('window').height / 2 - 75,
          left: Dimensions.get('window').width / 2 - 75,
          transform: [
            {
              scale: animated2,
            },
          ],
          zIndex:2
        }} />
    </View>
  );
}

export default Loader;