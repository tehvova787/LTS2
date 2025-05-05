# PowerShell script to create necessary assets

# Create directories
New-Item -ItemType Directory -Force -Path public\images | Out-Null
New-Item -ItemType Directory -Force -Path public\textures | Out-Null
New-Item -ItemType Directory -Force -Path public\videos | Out-Null
New-Item -ItemType Directory -Force -Path public\fonts | Out-Null

# Create dummy image files for placeholders
Write-Host "Creating placeholder images..."

# Create placeholders for all the required image files
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
        # Simple colored rectangle as placeholder
        $image = New-Object System.Drawing.Bitmap 200, 200
        $graphics = [System.Drawing.Graphics]::FromImage($image)
        $graphics.Clear([System.Drawing.Color]::Blue)
        $graphics.Dispose()
        
        # Create directory if it doesn't exist
        $directory = [System.IO.Path]::GetDirectoryName($file)
        if (-not (Test-Path $directory)) {
            New-Item -ItemType Directory -Force -Path $directory | Out-Null
        }
        
        # Save the image
        try {
            $image.Save($file, [System.Drawing.Imaging.ImageFormat]::Png)
            Write-Host "Created placeholder: $file"
        } catch {
            Write-Host "Could not create: $file"
            Write-Host $_.Exception.Message
        }
        $image.Dispose()
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
        # Simple colored rectangle as placeholder
        $image = New-Object System.Drawing.Bitmap 512, 512
        $graphics = [System.Drawing.Graphics]::FromImage($image)
        $graphics.Clear([System.Drawing.Color]::DarkBlue)

        # Draw some horizontal lines to simulate holographic pattern
        $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::LightBlue, 1)
        for ($i = 0; $i -lt 50; $i += 5) {
            $y = $i * 10
            $graphics.DrawLine($pen, 0, $y, 512, $y)
        }
        $pen.Dispose()
        $graphics.Dispose()
        
        # Create directory if it doesn't exist
        $directory = [System.IO.Path]::GetDirectoryName($file)
        if (-not (Test-Path $directory)) {
            New-Item -ItemType Directory -Force -Path $directory | Out-Null
        }
        
        # Save the image
        try {
            $image.Save($file, [System.Drawing.Imaging.ImageFormat]::Jpeg)
            Write-Host "Created texture: $file"
        } catch {
            Write-Host "Could not create: $file"
            Write-Host $_.Exception.Message
        }
        $image.Dispose()
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
        # Just create empty file as video placeholder
        # Note: Properly creating video files would require additional libraries
        New-Item -ItemType File -Force -Path $file | Out-Null
        Write-Host "Created video placeholder: $file"
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
        # Just create empty file as font placeholder
        New-Item -ItemType File -Force -Path $file | Out-Null
        Write-Host "Created font placeholder: $file"
    } else {
        Write-Host "File already exists: $file"
    }
}

Write-Host "Setup complete! All necessary assets have been created as placeholders."
Write-Host "Note: In a real project, you would replace these with actual assets." 