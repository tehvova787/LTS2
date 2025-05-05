#!/bin/bash

# Create directories
mkdir -p public/images
mkdir -p public/textures
mkdir -p public/videos
mkdir -p public/fonts

# Create placeholder images for mascot and logos
echo "Creating placeholder images..."

# Mascot images
echo '
<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="#4169E1" />
  <circle cx="200" cy="150" r="80" fill="#FFD700" />
  <rect x="100" y="200" width="200" height="150" rx="20" fill="#FFD700" />
  <circle cx="150" cy="350" r="30" fill="#333" />
  <circle cx="250" cy="350" r="30" fill="#333" />
  <circle cx="150" cy="350" r="15" fill="#FFF" />
  <circle cx="250" cy="350" r="15" fill="#FFF" />
  <circle cx="170" cy="130" r="15" fill="#333" />
  <circle cx="230" cy="130" r="15" fill="#333" />
  <path d="M150,180 Q200,220 250,180" stroke="#333" stroke-width="5" fill="none" />
</svg>
' > public/images/lucky-train-mascot.svg

convert public/images/lucky-train-mascot.svg public/images/lucky-train-mascot.png

# Waving mascot
echo '
<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="#4169E1" />
  <circle cx="200" cy="150" r="80" fill="#FFD700" />
  <rect x="100" y="200" width="200" height="150" rx="20" fill="#FFD700" />
  <circle cx="150" cy="350" r="30" fill="#333" />
  <circle cx="250" cy="350" r="30" fill="#333" />
  <circle cx="150" cy="350" r="15" fill="#FFF" />
  <circle cx="250" cy="350" r="15" fill="#FFF" />
  <circle cx="170" cy="130" r="15" fill="#333" />
  <circle cx="230" cy="130" r="15" fill="#333" />
  <path d="M150,180 Q200,220 250,180" stroke="#333" stroke-width="5" fill="none" />
  <path d="M310,120 Q280,130 290,160 Q300,190 280,200" stroke="#FFD700" stroke-width="20" fill="none" />
  <circle cx="310" cy="120" r="20" fill="#FFD700" />
  <circle cx="280" cy="200" r="15" fill="#FFD700" />
</svg>
' > public/images/lucky-train-mascot-wave.svg

convert public/images/lucky-train-mascot-wave.svg public/images/lucky-train-mascot-wave.png

# Create logo
echo '
<svg width="400" height="100" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="100" fill="none" />
  <circle cx="50" cy="50" r="30" fill="#4169E1" />
  <rect x="30" y="40" width="40" height="30" rx="5" fill="#4169E1" />
  <circle cx="40" cy="70" r="10" fill="#333" />
  <circle cx="60" cy="70" r="10" fill="#333" />
  <text x="100" y="65" font-family="Arial" font-size="40" font-weight="bold" fill="#4169E1">Lucky Train</text>
</svg>
' > public/images/lucky-train-logo.svg

convert public/images/lucky-train-logo.svg public/images/lucky-train-logo.png

# Create 3D icons
echo "Creating 3D icons..."

# Security icon
echo '
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="none" />
  <path d="M100,20 L40,50 L40,110 C40,140 70,170 100,180 C130,170 160,140 160,110 L160,50 L100,20" fill="#4169E1" />
  <path d="M90,90 L110,110 M110,90 L90,110" stroke="#FFFFFF" stroke-width="10" stroke-linecap="round" />
  <path d="M75,100 L125,100" stroke="#FFFFFF" stroke-width="10" stroke-linecap="round" />
</svg>
' > public/images/security-icon-3d.svg

convert public/images/security-icon-3d.svg public/images/security-icon-3d.png

# Transparency icon
echo '
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="none" />
  <circle cx="100" cy="100" r="80" fill="#FFD700" fill-opacity="0.8" />
  <circle cx="100" cy="100" r="60" fill="#FFFFFF" fill-opacity="0.6" />
  <path d="M70,100 L90,120 L130,80" stroke="#FFFFFF" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
</svg>
' > public/images/transparency-icon-3d.svg

convert public/images/transparency-icon-3d.svg public/images/transparency-icon-3d.png

# Profit icon
echo '
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="none" />
  <circle cx="100" cy="100" r="80" fill="#22C55E" />
  <text x="70" y="130" font-family="Arial" font-size="100" font-weight="bold" fill="#FFFFFF">$</text>
  <path d="M60,170 L140,170 L160,150 L170,120 L130,90 L100,110 L70,90 L30,120 L40,150 L60,170" fill="#22C55E" />
</svg>
' > public/images/profit-icon-3d.svg

convert public/images/profit-icon-3d.svg public/images/profit-icon-3d.png

# Rocket train
echo '
<svg width="400" height="200" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="200" fill="none" />
  <path d="M100,100 L200,20 L300,100 L200,180 Z" fill="#4169E1" />
  <path d="M200,20 L200,180" stroke="#FFD700" stroke-width="10" />
  <path d="M100,100 L300,100" stroke="#FFD700" stroke-width="10" />
  <circle cx="200" cy="100" r="30" fill="#FFD700" />
  <path d="M300,100 C350,100 350,50 400,50 L400,150 C350,150 350,100 300,100" fill="#FFD700" />
</svg>
' > public/images/rocket-train-3d.svg

convert public/images/rocket-train-3d.svg public/images/rocket-train-3d.png

# Create space background images
echo "Creating space background textures..."

# Small stars
echo '
<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="#000" />
  <!-- Generate 100 small stars -->
  <g fill="#FFF">
' > public/images/stars-small.svg

for i in {1..100}; do
  x=$((RANDOM % 400))
  y=$((RANDOM % 400))
  size=$((RANDOM % 2 + 1))
  opacity=$(awk -v min=0.1 -v max=1.0 -v seed=$RANDOM 'BEGIN { srand(seed); print min+rand()*(max-min) }')
  echo "    <circle cx=\"$x\" cy=\"$y\" r=\"$size\" opacity=\"$opacity\" />" >> public/images/stars-small.svg
done

echo '
  </g>
</svg>
' >> public/images/stars-small.svg

convert public/images/stars-small.svg public/images/stars-small.png

# Large stars
echo '
<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="#000" />
  <!-- Generate 30 larger stars -->
  <g fill="#FFF">
' > public/images/stars-large.svg

for i in {1..30}; do
  x=$((RANDOM % 400))
  y=$((RANDOM % 400))
  size=$((RANDOM % 3 + 2))
  opacity=$(awk -v min=0.3 -v max=1.0 -v seed=$RANDOM 'BEGIN { srand(seed); print min+rand()*(max-min) }')
  echo "    <circle cx=\"$x\" cy=\"$y\" r=\"$size\" opacity=\"$opacity\" />" >> public/images/stars-large.svg
done

echo '
  </g>
</svg>
' >> public/images/stars-large.svg

convert public/images/stars-large.svg public/images/stars-large.png

# Hologram texture
echo "Creating hologram texture..."
echo '
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#000022" />
  <!-- Horizontal lines -->
  <g stroke="#4169E1" stroke-opacity="0.5">
' > public/textures/hologram_pattern.svg

for i in {0..50}; do
  y=$((i * 10))
  opacity=$(awk -v min=0.05 -v max=0.3 -v seed=$RANDOM 'BEGIN { srand(seed); print min+rand()*(max-min) }')
  echo "    <line x1=\"0\" y1=\"$y\" x2=\"512\" y2=\"$y\" stroke-width=\"1\" stroke-opacity=\"$opacity\" />" >> public/textures/hologram_pattern.svg
done

# Add some random digital-looking elements
echo '
  </g>
  <g fill="#4169E1" fill-opacity="0.2">
' >> public/textures/hologram_pattern.svg

for i in {1..100}; do
  x=$((RANDOM % 512))
  y=$((RANDOM % 512))
  size=$((RANDOM % 4 + 1))
  type=$((RANDOM % 4))
  opacity=$(awk -v min=0.1 -v max=0.4 -v seed=$RANDOM 'BEGIN { srand(seed); print min+rand()*(max-min) }')
  
  if [ $type -eq 0 ]; then
    echo "    <circle cx=\"$x\" cy=\"$y\" r=\"$size\" fill-opacity=\"$opacity\" />" >> public/textures/hologram_pattern.svg
  elif [ $type -eq 1 ]; then
    echo "    <rect x=\"$x\" y=\"$y\" width=\"$((size*2))\" height=\"$size\" fill-opacity=\"$opacity\" />" >> public/textures/hologram_pattern.svg
  elif [ $type -eq 2 ]; then
    echo "    <rect x=\"$x\" y=\"$y\" width=\"$size\" height=\"$((size*2))\" fill-opacity=\"$opacity\" />" >> public/textures/hologram_pattern.svg
  else
    echo "    <rect x=\"$x\" y=\"$y\" width=\"$size\" height=\"$size\" fill-opacity=\"$opacity\" />" >> public/textures/hologram_pattern.svg
  fi
done

echo '
  </g>
</svg>
' >> public/textures/hologram_pattern.svg

convert public/textures/hologram_pattern.svg public/textures/hologram_pattern.jpg

# Create placeholder video files
echo "Creating placeholder videos..."
for i in {1..3}; do
  ffmpeg -f lavfi -i testsrc=duration=5:size=1280x720:rate=30 -vf "drawtext=fontfile=/usr/share/fonts/truetype/freefont/FreeSerif.ttf:text='Lucky Train Promo $i':fontcolor=white:fontsize=36:x=(w-text_w)/2:y=(h-text_h)/2" -c:v libx264 public/videos/lucky-train-promo$i.mp4
done

# Create placeholder font files
echo "Creating font files..."
mkdir -p temp_fonts
cd temp_fonts

# Download the Inter font files
curl -L -o inter.zip https://github.com/rsms/inter/releases/download/v3.19/Inter-3.19.zip
unzip inter.zip

cp Inter\ Desktop/Inter-Bold.otf ../public/fonts/Inter-Bold.otf
cp Inter\ Desktop/Inter-Regular.otf ../public/fonts/Inter-Regular.otf

# Convert OTF to WOFF for web use
ffmpeg -i ../public/fonts/Inter-Bold.otf ../public/fonts/Inter-Bold.woff
ffmpeg -i ../public/fonts/Inter-Regular.otf ../public/fonts/Inter-Regular.woff

cd ..
rm -rf temp_fonts

echo "Setup complete! All necessary assets have been created." 