import { useState } from 'react'
import { useThree } from '@react-three/fiber'
import { Text, Box, Sphere, Cylinder } from '@react-three/drei'
import { Interactive } from '@react-three/xr'
import { VRComfortSettings, defaultVRComfortSettings } from './VRSystem'
import * as THREE from 'three'

interface VRSettingsProps {
  initialSettings?: VRComfortSettings
  onSettingsChange?: (settings: VRComfortSettings) => void
  visible?: boolean
}

export default function VRSettings({
  initialSettings = defaultVRComfortSettings,
  onSettingsChange,
  visible = false
}: VRSettingsProps) {
  const [settings, setSettings] = useState<VRComfortSettings>(initialSettings)
  const [activeTab, setActiveTab] = useState<'comfort' | 'display' | 'controls'>('comfort')
  const { scene } = useThree()
  
  // Don't render if not visible
  if (!visible) return null
  
  // Handle setting changes
  const updateSetting = <K extends keyof VRComfortSettings>(
    key: K, 
    value: VRComfortSettings[K]
  ) => {
    const newSettings = {
      ...settings,
      [key]: value
    }
    
    setSettings(newSettings)
    
    if (onSettingsChange) {
      onSettingsChange(newSettings)
    }
  }
  
  return (
    <group position={[0, 1.5, -1.5]}>
      {/* Main panel background */}
      <mesh>
        <boxGeometry args={[1.2, 0.8, 0.05]} />
        <meshStandardMaterial
          color="#111827"
          roughness={0.3}
          metalness={0.7}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Panel header */}
      <Text
        position={[0, 0.35, 0.03]}
        fontSize={0.08}
        color="#00f0ff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Orbitron-Medium.ttf"
      >
        VR SETTINGS
      </Text>
      
      {/* Tab buttons */}
      <group position={[0, 0.25, 0.03]}>
        {[
          { id: 'comfort', label: 'COMFORT' },
          { id: 'display', label: 'DISPLAY' },
          { id: 'controls', label: 'CONTROLS' }
        ].map((tab, index) => (
          <TabButton
            key={tab.id}
            label={tab.label}
            position={[(index - 1) * 0.35, 0, 0]}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id as any)}
          />
        ))}
      </group>
      
      {/* Settings content based on active tab */}
      <group position={[0, 0, 0.03]}>
        {activeTab === 'comfort' && (
          <ComfortSettings 
            settings={settings}
            onUpdateSetting={updateSetting}
          />
        )}
        
        {activeTab === 'display' && (
          <DisplaySettings 
            settings={settings}
            onUpdateSetting={updateSetting}
          />
        )}
        
        {activeTab === 'controls' && (
          <ControlsSettings 
            settings={settings}
            onUpdateSetting={updateSetting}
          />
        )}
      </group>
    </group>
  )
}

// Tab button component
interface TabButtonProps {
  label: string
  position: [number, number, number]
  active: boolean
  onClick: () => void
}

function TabButton({ label, position, active, onClick }: TabButtonProps) {
  return (
    <Interactive onSelect={onClick}>
      <group position={position}>
        <mesh>
          <planeGeometry args={[0.3, 0.08]} />
          <meshStandardMaterial 
            color={active ? '#1e40af' : '#1e293b'}
            roughness={0.4}
            metalness={0.6}
            emissive={active ? '#60a5fa' : '#000000'}
            emissiveIntensity={active ? 0.5 : 0}
          />
        </mesh>
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.04}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Medium.ttf"
        >
          {label}
        </Text>
      </group>
    </Interactive>
  )
}

// Toggle switch component
interface ToggleSwitchProps {
  label: string
  position: [number, number, number]
  value: boolean
  onChange: (value: boolean) => void
}

function ToggleSwitch({ label, position, value, onChange }: ToggleSwitchProps) {
  return (
    <Interactive onSelect={() => onChange(!value)}>
      <group position={position}>
        <Text
          position={[-0.3, 0, 0]}
          fontSize={0.05}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
          font="/fonts/Inter-Medium.ttf"
        >
          {label}
        </Text>
        
        <mesh position={[0.35, 0, 0]}>
          <planeGeometry args={[0.15, 0.06]} />
          <meshStandardMaterial 
            color={value ? '#059669' : '#4b5563'}
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>
        
        <mesh position={[0.35 + (value ? 0.04 : -0.04), 0, 0.01]}>
          <circleGeometry args={[0.025, 16]} />
          <meshStandardMaterial 
            color="#ffffff"
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
      </group>
    </Interactive>
  )
}

// Slider control component
interface SliderProps {
  label: string
  position: [number, number, number]
  min: number
  max: number
  step: number
  value: number
  onChange: (value: number) => void
}

function Slider({ label, position, min, max, step, value, onChange }: SliderProps) {
  const sliderWidth = 0.4
  const normalizedValue = (value - min) / (max - min)
  const sliderPosition = -sliderWidth/2 + normalizedValue * sliderWidth
  
  // Handle click on slider
  const handleClick = (e: THREE.Event) => {
    // Get local X coordinate in slider space
    if (e.point) {
      const localX = e.point.x - position[0] + sliderWidth/2
      const ratio = Math.max(0, Math.min(1, localX / sliderWidth))
      const newValue = min + ratio * (max - min)
      
      // Round to step precision
      const steppedValue = Math.round(newValue / step) * step
      
      onChange(steppedValue)
    }
  }
  
  return (
    <group position={position}>
      <Text
        position={[-0.3, 0, 0]}
        fontSize={0.05}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
        font="/fonts/Inter-Medium.ttf"
        maxWidth={0.5}
      >
        {label}
      </Text>
      
      <Interactive onSelect={handleClick}>
        <group position={[0.15, 0, 0]}>
          {/* Slider track */}
          <mesh>
            <boxGeometry args={[sliderWidth, 0.01, 0.01]} />
            <meshStandardMaterial color="#4b5563" />
          </mesh>
          
          {/* Slider handle */}
          <mesh position={[sliderPosition, 0, 0.01]}>
            <sphereGeometry args={[0.02, 16, 16]} />
            <meshStandardMaterial color="#00f0ff" />
          </mesh>
          
          {/* Value indicator */}
          <Text
            position={[0, -0.04, 0]}
            fontSize={0.03}
            color="#a3a3a3"
            anchorX="center"
            anchorY="top"
            font="/fonts/Inter-Medium.ttf"
          >
            {value.toFixed(1)}
          </Text>
        </group>
      </Interactive>
    </group>
  )
}

// Comfort settings panel
interface ComfortSettingsPanelProps {
  settings: VRComfortSettings
  onUpdateSetting: <K extends keyof VRComfortSettings>(
    key: K, 
    value: VRComfortSettings[K]
  ) => void
}

function ComfortSettings({ settings, onUpdateSetting }: ComfortSettingsPanelProps) {
  return (
    <group position={[0, 0, 0]}>
      <ToggleSwitch
        label="Vignette"
        position={[0, 0.1, 0]}
        value={settings.vignetteEnabled}
        onChange={(value) => onUpdateSetting('vignetteEnabled', value)}
      />
      
      <Slider
        label="Vignette Intensity"
        position={[0, 0, 0]}
        min={0}
        max={1}
        step={0.1}
        value={settings.vignetteIntensity}
        onChange={(value) => onUpdateSetting('vignetteIntensity', value)}
      />
      
      <ToggleSwitch
        label="Snap Turn"
        position={[0, -0.1, 0]}
        value={settings.snapTurnEnabled}
        onChange={(value) => onUpdateSetting('snapTurnEnabled', value)}
      />
      
      <Slider
        label="Turn Angle"
        position={[0, -0.2, 0]}
        min={15}
        max={90}
        step={15}
        value={settings.snapTurnDegrees}
        onChange={(value) => onUpdateSetting('snapTurnDegrees', value)}
      />
    </group>
  )
}

// Display settings panel
function DisplaySettings({ settings, onUpdateSetting }: ComfortSettingsPanelProps) {
  return (
    <group position={[0, 0, 0]}>
      <Slider
        label="Height Offset"
        position={[0, 0.1, 0]}
        min={-0.5}
        max={0.5}
        step={0.05}
        value={settings.heightOffset}
        onChange={(value) => onUpdateSetting('heightOffset', value)}
      />
      
      {/* Add more display settings as needed */}
    </group>
  )
}

// Controls settings panel
function ControlsSettings({ settings, onUpdateSetting }: ComfortSettingsPanelProps) {
  return (
    <group position={[0, 0, 0]}>
      <Slider
        label="Movement Speed"
        position={[0, 0.1, 0]}
        min={0.5}
        max={2}
        step={0.1}
        value={settings.movementSpeed}
        onChange={(value) => onUpdateSetting('movementSpeed', value)}
      />
      
      <Slider
        label="Turn Speed"
        position={[0, 0, 0]}
        min={0.5}
        max={2}
        step={0.1}
        value={settings.turnSpeed}
        onChange={(value) => onUpdateSetting('turnSpeed', value)}
      />
      
      {/* Add more control settings as needed */}
    </group>
  )
} 