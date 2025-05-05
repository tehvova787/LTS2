'use client'

import React from 'react'
import { useRiveAnimationContext } from './RiveAnimationProvider'
import { AnimatedCard } from './AnimatedWrapper'
import { RiveAnimation, RiveHoverAnimation } from './RiveAnimation'

export default function DesignStyleGuide() {
  const { useRiveAnimations, getAnimationAsset } = useRiveAnimationContext();

  return (
    <section className="py-16 bg-light-bg">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-10 font-montserrat text-gray-800">Semi Flat Design System</h1>
        
        {/* Color Palette */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 font-montserrat text-gray-800">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="h-24 bg-primary rounded-lg shadow-sm mb-2"></div>
              <p className="font-medium">Primary Blue</p>
              <p className="text-sm text-gray-500">#4A90E2</p>
            </div>
            <div>
              <div className="h-24 bg-secondary rounded-lg shadow-sm mb-2"></div>
              <p className="font-medium">Secondary Mint</p>
              <p className="text-sm text-gray-500">#50E3C2</p>
            </div>
            <div>
              <div className="h-24 bg-accent rounded-lg shadow-sm mb-2"></div>
              <p className="font-medium">Accent Yellow</p>
              <p className="text-sm text-gray-500">#F5A623</p>
            </div>
            <div>
              <div className="h-24 bg-coral rounded-lg shadow-sm mb-2"></div>
              <p className="font-medium">Coral</p>
              <p className="text-sm text-gray-500">#FF7F7F</p>
            </div>
            <div>
              <div className="h-24 bg-purple rounded-lg shadow-sm mb-2"></div>
              <p className="font-medium">Purple</p>
              <p className="text-sm text-gray-500">#9013FE</p>
            </div>
            <div>
              <div className="h-24 bg-green rounded-lg shadow-sm mb-2"></div>
              <p className="font-medium">Green</p>
              <p className="text-sm text-gray-500">#7FD77F</p>
            </div>
            <div>
              <div className="h-24 bg-light-bg rounded-lg shadow-sm mb-2"></div>
              <p className="font-medium">Light Background</p>
              <p className="text-sm text-gray-500">#F5F5F5</p>
            </div>
            <div>
              <div className="h-24 bg-gray-bg rounded-lg shadow-sm mb-2"></div>
              <p className="font-medium">Gray Background</p>
              <p className="text-sm text-gray-500">#E8E8E8</p>
            </div>
          </div>
        </div>
        
        {/* Typography */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 font-montserrat text-gray-800">Typography</h2>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="mb-8">
              <p className="text-sm text-gray-500 mb-2">Heading Font: Montserrat</p>
              <h1 className="text-4xl font-bold font-montserrat mb-2">H1 Heading</h1>
              <h2 className="text-3xl font-bold font-montserrat mb-2">H2 Heading</h2>
              <h3 className="text-2xl font-semibold font-montserrat mb-2">H3 Heading</h3>
              <h4 className="text-xl font-semibold font-montserrat mb-2">H4 Heading</h4>
              <h5 className="text-lg font-medium font-montserrat mb-2">H5 Heading</h5>
              <h6 className="text-base font-medium font-montserrat">H6 Heading</h6>
            </div>
            
            <div className="mb-8">
              <p className="text-sm text-gray-500 mb-2">Subheading Font: Poppins</p>
              <p className="text-xl font-medium font-poppins mb-2">Subheading Large</p>
              <p className="text-lg font-medium font-poppins mb-2">Subheading Medium</p>
              <p className="text-base font-medium font-poppins">Subheading Small</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-2">Body Font: Open Sans</p>
              <p className="text-lg font-opensans mb-2">Large body text. Semi flat design uses clean, legible typography with good contrast.</p>
              <p className="text-base font-opensans mb-2">Medium body text. This is the standard size for most content areas with comfortable reading.</p>
              <p className="text-sm font-opensans">Small body text, used for supporting information and captions.</p>
            </div>
          </div>
        </div>
        
        {/* Buttons */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 font-montserrat text-gray-800">Buttons</h2>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-gray-500 mb-4">Primary Buttons</p>
                <div className="flex flex-wrap gap-4 mb-4">
                  {useRiveAnimations ? (
                    <RiveHoverAnimation
                      src={getAnimationAsset('button')}
                      stateMachine="ButtonStateMachine"
                      height="50px"
                      width="180px"
                      className="flex items-center justify-center text-white font-medium"
                    >
                      <span className="relative z-10">Primary Button</span>
                    </RiveHoverAnimation>
                  ) : (
                    <button className="btn btn-primary">Primary Button</button>
                  )}
                  <button className="btn btn-primary" disabled>Disabled</button>
                </div>
                <p className="text-sm text-gray-500 mb-4">Secondary Buttons</p>
                <div className="flex flex-wrap gap-4 mb-4">
                  {useRiveAnimations ? (
                    <RiveHoverAnimation
                      src={getAnimationAsset('button')}
                      stateMachine="ButtonStateMachine"
                      height="50px"
                      width="180px"
                      className="flex items-center justify-center bg-secondary text-white font-medium"
                    >
                      <span className="relative z-10">Secondary Button</span>
                    </RiveHoverAnimation>
                  ) : (
                    <button className="btn btn-secondary">Secondary Button</button>
                  )}
                  <button className="btn btn-secondary" disabled>Disabled</button>
                </div>
                <p className="text-sm text-gray-500 mb-4">Accent Buttons</p>
                <div className="flex flex-wrap gap-4">
                  {useRiveAnimations ? (
                    <RiveHoverAnimation
                      src={getAnimationAsset('button')}
                      stateMachine="ButtonStateMachine"
                      height="50px"
                      width="180px"
                      className="flex items-center justify-center bg-accent text-white font-medium"
                    >
                      <span className="relative z-10">Accent Button</span>
                    </RiveHoverAnimation>
                  ) : (
                    <button className="btn btn-accent">Accent Button</button>
                  )}
                  <button className="btn btn-accent" disabled>Disabled</button>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-4">Outline Buttons</p>
                <div className="flex flex-wrap gap-4 mb-4">
                  <button className="btn btn-outline">Outline Button</button>
                  <button className="btn btn-outline" disabled>Disabled</button>
                </div>
                <p className="text-sm text-gray-500 mb-4">Button Sizes</p>
                <div className="flex flex-wrap items-center gap-4">
                  <button className="btn btn-primary px-6 py-1 text-sm">Small</button>
                  <button className="btn btn-primary px-6 py-2">Medium</button>
                  <button className="btn btn-primary px-8 py-3 text-lg">Large</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Cards */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 font-montserrat text-gray-800">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {useRiveAnimations ? (
              <AnimatedCard
                useRive={true}
                riveProps={{
                  src: getAnimationAsset('card'),
                  stateMachine: 'CardStateMachine'
                }}
              >
                <div className="card relative z-10">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold font-montserrat text-gray-800 mb-3">Rive Animated Card</h3>
                    <p className="text-gray-600 mb-4">A card with Rive animation for interactive hover effects.</p>
                    <button className="btn btn-outline px-4 py-2 text-sm">Learn More</button>
                  </div>
                </div>
              </AnimatedCard>
            ) : (
              <div className="card">
                <div className="p-6">
                  <h3 className="text-xl font-semibold font-montserrat text-gray-800 mb-3">Basic Card</h3>
                  <p className="text-gray-600 mb-4">A simple card with clean styling and subtle shadow for depth.</p>
                  <button className="btn btn-outline px-4 py-2 text-sm">Learn More</button>
                </div>
              </div>
            )}
            
            <div className="card">
              <div className="card-header">
                <h3 className="text-xl font-semibold font-montserrat text-gray-800">Card with Header</h3>
              </div>
              <div className="card-body">
                <p className="text-gray-600">Content area with standardized padding.</p>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary px-4 py-2 text-sm">Action</button>
              </div>
            </div>
            
            {useRiveAnimations ? (
              <AnimatedCard
                useRive={true}
                riveProps={{
                  src: getAnimationAsset('card'),
                  stateMachine: 'CardStateMachine'
                }}
              >
                <div className="card overflow-hidden relative z-10">
                  <div className="h-48 bg-primary/10 relative">
                    <RiveAnimation
                      src={getAnimationAsset('background')}
                      height="100%"
                      width="100%"
                      autoplay={true}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold font-montserrat text-gray-800 mb-3">Card with Rive Animation</h3>
                    <p className="text-gray-600">Cards can include Rive animations for rich interactive experiences.</p>
                  </div>
                </div>
              </AnimatedCard>
            ) : (
              <div className="card overflow-hidden">
                <div className="h-48 bg-primary/10"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold font-montserrat text-gray-800 mb-3">Card with Image</h3>
                  <p className="text-gray-600">Cards can include images or other media at the top.</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Form Elements */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 font-montserrat text-gray-800">Form Elements</h2>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="mb-6">
                  <label htmlFor="textInput" className="block text-gray-700 font-medium mb-2">Text Input</label>
                  <input type="text" id="textInput" className="form-input" placeholder="Enter text" />
                </div>
                <div className="mb-6">
                  <label htmlFor="selectInput" className="block text-gray-700 font-medium mb-2">Select Input</label>
                  <select id="selectInput" className="form-input">
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="mb-6">
                  <label htmlFor="textareaInput" className="block text-gray-700 font-medium mb-2">Textarea</label>
                  <textarea id="textareaInput" rows={4} className="form-input" placeholder="Enter text"></textarea>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Checkbox</label>
                  <div className="flex items-center">
                    <input type="checkbox" id="checkboxInput" className="h-5 w-5 text-primary rounded" />
                    <label htmlFor="checkboxInput" className="ml-2 text-gray-700">Remember me</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Alerts */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 font-montserrat text-gray-800">Alerts</h2>
          <div className="space-y-4">
            <div className="alert alert-info">
              <div className="font-medium">Information Message</div>
              <p>This is an information alert — check it out!</p>
            </div>
            <div className="alert alert-success">
              <div className="font-medium">Success Message</div>
              <p>This is a success alert — check it out!</p>
            </div>
            <div className="alert alert-warning">
              <div className="font-medium">Warning Message</div>
              <p>This is a warning alert — check it out!</p>
            </div>
            <div className="alert alert-danger">
              <div className="font-medium">Error Message</div>
              <p>This is an error alert — check it out!</p>
            </div>
          </div>
        </div>
        
        {/* Badges */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 font-montserrat text-gray-800">Badges</h2>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-gray-500 mb-4">Basic Badges</p>
                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-primary">Primary</span>
                  <span className="badge badge-secondary">Secondary</span>
                  <span className="badge badge-accent">Accent</span>
                  <span className="badge bg-green text-white">Success</span>
                  <span className="badge bg-red text-white">Error</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-4">Rounded Badges</p>
                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-primary px-4">New</span>
                  <span className="badge badge-secondary px-4">Featured</span>
                  <span className="badge badge-accent px-4">Popular</span>
                  <span className="badge bg-blue/10 text-blue">Info</span>
                  <span className="badge bg-purple/10 text-purple">Premium</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 