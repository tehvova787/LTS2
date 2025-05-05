import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera, Text, Html } from '@react-three/drei';
import * as THREE from 'three';

interface TrainCarProps {
  position: [number, number, number];
  color: string;
  tier: string;
  amount: string;
  reward: string;
  onClick: () => void;
  active: boolean;
}

// Train car model that represents a staking position
const TrainCar: React.FC<TrainCarProps> = ({ position, color, tier, amount, reward, onClick, active }) => {
  const { scene } = useGLTF('/models/train_car.glb');
  const trainRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (trainRef.current) {
      trainRef.current.rotation.y += 0.001;
      if (active) {
        trainRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.05 + position[1];
      }
    }
  });
  
  // Clone and modify the model
  const model = React.useMemo(() => {
    const clonedScene = scene.clone();
    clonedScene.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) {
        (node as THREE.Mesh).material = new THREE.MeshStandardMaterial({
          color: color,
          metalness: 0.8,
          roughness: 0.2,
        });
      }
    });
    return clonedScene;
  }, [scene, color]);
  
  return (
    <group 
      ref={trainRef} 
      position={position} 
      onClick={onClick}
      scale={[0.5, 0.5, 0.5]}
    >
      <primitive object={model} />
      
      {/* Use Html with wrapperClass to properly handle HTML content in 3D space */}
      <Html position={[0, 1.5, 0]} center distanceFactor={10} transform occlude>
        <div className={`px-3 py-2 rounded-lg text-center ${active ? 'bg-green-500' : 'bg-blue-900'} transition-all duration-300`}>
          <div className="text-white font-bold">{tier}</div>
          <div className="text-xs text-white/80">{amount} TON</div>
        </div>
      </Html>
      
      {active && (
        <Html position={[0, -1.2, 0]} center distanceFactor={10} transform occlude>
          <div className="bg-green-800/80 px-4 py-2 rounded-xl shadow-lg backdrop-blur-sm">
            <div className="text-white text-sm">Доходность: {reward}% APY</div>
            <div className="text-white/80 text-xs">Активный стейкинг</div>
          </div>
        </Html>
      )}
    </group>
  );
};

interface StakingData {
  tier: string;
  amount: string;
  reward: string;
  color: string;
}

interface TrainSceneProps {
  stakingData: StakingData[];
  activeCarIndex: number;
  setActiveCarIndex: (index: number) => void;
}

// Main train visualization component
const TrainScene: React.FC<TrainSceneProps> = ({ stakingData, activeCarIndex, setActiveCarIndex }) => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 3, 10);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  // Setup the rails
  const railsRef = useRef<THREE.Group>(null);
  useFrame(() => {
    if (railsRef.current) {
      railsRef.current.rotation.y += 0.001;
    }
  });
  
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 3, 10]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, 10, 5]} intensity={0.5} />
      
      <group ref={railsRef}>
        {/* Train track */}
        <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[5, 5, 0.1, 32, 1, true]} />
          <meshStandardMaterial color="#444" side={THREE.DoubleSide} />
        </mesh>
        
        {/* Train cars */}
        {stakingData.map((car, index) => (
          <TrainCar 
            key={index}
            position={[
              4 * Math.cos(index * (Math.PI * 2) / stakingData.length),
              0,
              4 * Math.sin(index * (Math.PI * 2) / stakingData.length)
            ]}
            color={car.color}
            tier={car.tier}
            amount={car.amount}
            reward={car.reward}
            active={index === activeCarIndex}
            onClick={() => setActiveCarIndex(index)}
          />
        ))}
      </group>
      
      <OrbitControls 
        enableZoom={true}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
      />
    </>
  );
};

interface Train3DStakingProps {
  userStake?: number | null;
}

// Main export component
const Train3DStaking: React.FC<Train3DStakingProps> = ({ userStake = null }) => {
  const [activeCarIndex, setActiveCarIndex] = useState(0);
  
  // Sample staking tiers data - this would come from the blockchain in production
  const stakingData: StakingData[] = [
    { tier: 'Пассажир', amount: '100', reward: '8', color: '#4299e1' },
    { tier: 'Проводник', amount: '500', reward: '10', color: '#38b2ac' },
    { tier: 'Машинист', amount: '1000', reward: '12', color: '#48bb78' },
    { tier: 'Начальник', amount: '5000', reward: '15', color: '#ecc94b' },
    { tier: 'Владелец', amount: '10000', reward: '20', color: '#ed8936' },
  ];
  
  // If user has a stake, find their tier and set it active
  useEffect(() => {
    if (userStake) {
      const index = stakingData.findIndex(car => parseInt(car.amount) <= userStake && 
        (stakingData[stakingData.indexOf(car) + 1] 
          ? userStake < parseInt(stakingData[stakingData.indexOf(car) + 1].amount) 
          : true));
      
      if (index !== -1) {
        setActiveCarIndex(index);
      }
    }
  }, [userStake, stakingData]);

  return (
    <div className="w-full h-[60vh] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-b from-blue-900/40 to-indigo-900/40 backdrop-blur-md">
      <Canvas shadows>
        <TrainScene 
          stakingData={stakingData} 
          activeCarIndex={activeCarIndex} 
          setActiveCarIndex={setActiveCarIndex}
        />
      </Canvas>
      
      <div className="absolute bottom-4 left-0 right-0 px-6">
        <div className="bg-blue-900/80 backdrop-blur-md rounded-xl p-4 max-w-md mx-auto">
          <h3 className="text-xl text-white font-bold mb-2">{stakingData[activeCarIndex].tier}</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-blue-200">Минимальный стейк:</p>
              <p className="text-white font-bold">{stakingData[activeCarIndex].amount} TON</p>
            </div>
            <div>
              <p className="text-blue-200">Доходность:</p>
              <p className="text-green-400 font-bold">{stakingData[activeCarIndex].reward}% APY</p>
            </div>
          </div>
          
          <div className="mt-4">
            <button className="w-full py-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold hover:from-green-600 hover:to-teal-600 transition-all">
              Стейкинг {stakingData[activeCarIndex].tier}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Train3DStaking; 