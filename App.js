/*
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';


export default function App() {

  const [running, setRunning] = useState(false)
  const [gameEngine, setGameEngine] = useState(null)
  const [currentPoints, setCurrentPoints] = useState(0)
  const [sound, setSound] = useState(null);

  useEffect(() => {
    setRunning(false)
  }, [])

  return (
    <ImageBackground source={require('./assets/grass.png')} style={{flex: 1}}>
    <View style={{flex: 1}}>
      <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', margin: 50 }}>{currentPoints}</Text>
      <GameEngine
        ref={(ref) => {setGameEngine(ref)}}
        systems={[Physics]}
        entities={entities()}
        running={running}
        onEvent={(e) => {
          switch(e.type){
            case 'game_over':
              setRunning(false)
              gameEngine.stop()
              break;
            case 'new_point':
              setCurrentPoints(currentPoints + 1)
              break;
          }
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      >

        <StatusBar style="auto" hidden={true} />

      </GameEngine>
      
      {!running ? 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={{backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10}}
            onPress={() => {
              setCurrentPoints(0)
              setRunning(true)
              gameEngine.swap(entities())
            }}
          >
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 30 }}>
              START GAME
            </Text>
          </TouchableOpacity>
        </View> : null}
        
    </View>

    </ImageBackground>
  );
}
*/

import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';
import { Audio } from 'expo-av';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    async function setupAudio() {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('./assets/drake-diss.mp3')
        );
        setSound(sound);
        await sound.playAsync();
        await sound.setIsLoopingAsync(true); // Loop the audio
      } catch (error) {
        console.error('Failed to setup audio:', error);
      }
    }

    setupAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const startGame = () => {
    setCurrentPoints(0);
    setRunning(true);
    gameEngine.swap(entities());
  };

  const endGame = () => {
    setRunning(false);
    gameEngine.stop();
  };

  return (
    <ImageBackground source={require('./assets/grass.png')} style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', margin: 50 }}>{currentPoints}</Text>
        <GameEngine
          ref={(ref) => { setGameEngine(ref); }}
          systems={[Physics]}
          entities={entities()}
          running={running}
          onEvent={(e) => {
            switch (e.type) {
              case 'game_over':
                endGame();
                break;
              case 'new_point':
                setCurrentPoints(currentPoints + 1);
                break;
            }
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
        >
          <StatusBar style="auto" hidden={true} />
        </GameEngine>
        {!running ? 
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={{ backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10 }} onPress={startGame}>
              <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>
                START GAME
              </Text>
            </TouchableOpacity>
          </View> : null}
      </View>
    </ImageBackground>
  );
}
