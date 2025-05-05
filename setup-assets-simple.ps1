# PowerShell script to create necessary asset placeholders without System.Drawing dependencies

# Create directories
New-Item -ItemType Directory -Force -Path public\images | Out-Null
New-Item -ItemType Directory -Force -Path public\textures | Out-Null
New-Item -ItemType Directory -Force -Path public\videos | Out-Null
New-Item -ItemType Directory -Force -Path public\fonts | Out-Null

# Create empty image placeholders
Write-Host "Creating placeholder images..."

$imageFiles = @(
    "public\images\lucky-train-mascot.png",
    "public\images\lucky-train-mascot-wave.png",
    "public\images\lucky-train-logo.png",
    "public\images\security-icon-3d.png",
    "public\images\transparency-icon-3d.png",
    "public\images\profit-icon-3d.png",
    "public\images\rocket-train-3d.png",
    "public\images\stars-small.png",
    "public\images\stars-large.png"
)

foreach ($file in $imageFiles) {
    if (-not (Test-Path $file)) {
        # Create empty placeholder file
        New-Item -ItemType File -Force -Path $file | Out-Null
        # Write a small amount of data to make it a valid file
        [byte[]]$bytes = 1..100 | ForEach-Object { Get-Random -Minimum 0 -Maximum 255 }
        [System.IO.File]::WriteAllBytes($file, $bytes)
        Write-Host "Created placeholder: $file"
    } else {
        Write-Host "File already exists: $file"
    }
}

# Create texture placeholders
$textureFiles = @(
    "public\textures\hologram_pattern.jpg"
)

foreach ($file in $textureFiles) {
    if (-not (Test-Path $file)) {
        # Create empty placeholder file
        New-Item -ItemType File -Force -Path $file | Out-Null
        # Write a small amount of data to make it a valid file
        [byte[]]$bytes = 1..100 | ForEach-Object { Get-Random -Minimum 0 -Maximum 255 }
        [System.IO.File]::WriteAllBytes($file, $bytes)
        Write-Host "Created placeholder: $file"
    } else {
        Write-Host "File already exists: $file"
    }
}

# Create placeholder videos
Write-Host "Creating placeholder video files..."
$videoFiles = @(
    "public\videos\lucky-train-promo1.mp4",
    "public\videos\lucky-train-promo2.mp4",
    "public\videos\lucky-train-promo3.mp4"
)

foreach ($file in $videoFiles) {
    if (-not (Test-Path $file)) {
        # Create empty placeholder file
        New-Item -ItemType File -Force -Path $file | Out-Null
        Write-Host "Created placeholder: $file"
    } else {
        Write-Host "File already exists: $file"
    }
}

# Create placeholder fonts
Write-Host "Creating font placeholders..."
$fontFiles = @(
    "public\fonts\Inter-Bold.woff",
    "public\fonts\Inter-Regular.woff"
)

foreach ($file in $fontFiles) {
    if (-not (Test-Path $file)) {
        # Create empty placeholder file
        New-Item -ItemType File -Force -Path $file | Out-Null
        Write-Host "Created placeholder: $file"
    } else {
        Write-Host "File already exists: $file"
    }
}

Write-Host "Setup complete! All necessary assets have been created as placeholders."
Write-Host "Note: In a real project, you would replace these with actual assets."
Write-Host "Warning: The placeholder files are not valid image/video/font files and should be replaced." 