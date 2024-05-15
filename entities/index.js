import Matter from "matter-js"
import Bird from "../components/Bird"
import Floor from "../components/Floor"

import { Dimensions } from "react-native"
import Obstacle from "../components/Obstacle"
import { getPipeSizePosPair } from "../utils/random"

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width


export default restart => {
    let engine = Matter.Engine.create({enabledSleeping: false})

    let world = engine.world

    //world.gravity.y = 0.4
    engine.gravity.y = 0.4

    const pipSizePosA = getPipeSizePosPair()
    const pipSizePosB = getPipeSizePosPair(windowWidth * 0.9)

    return {
        physics: {engine, world},
        Bird: Bird(world, 'green', {x: 50, y: 300}, {height: 40, width: 40}),

        ObstacleTop1: Obstacle(world, 'ObstacleTop1', 'red', pipSizePosA.pipeTop.pos, pipSizePosA.pipeTop.size),
        ObstacleBottom1: Obstacle(world, 'ObstacleBottom1', 'blue', pipSizePosA.pipeBottom.pos, pipSizePosA.pipeBottom.size),
        
        ObstacleTop2: Obstacle(world, 'ObstacleTop2', 'red', pipSizePosB.pipeTop.pos, pipSizePosB.pipeTop.size),
        ObstacleBottom2: Obstacle(world, 'ObstacleBottom2', 'blue', pipSizePosB.pipeBottom.pos, pipSizePosB.pipeBottom.size),
        
        
        Floor: Floor(world, 'green', {x: windowWidth / 2, y: windowHeight}, {height: 50, width: windowWidth}),
    }
}