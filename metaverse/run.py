import os
import sys
import subprocess
import argparse

def setup_environment():
    """Install required packages"""
    requirements = [
        "fastapi",
        "uvicorn",
        "websockets",
        "aiosqlite",
        "numpy"
    ]
    
    print("Setting up environment...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "--upgrade"] + requirements)
    print("Environment setup complete.")

def run_backend():
    """Run the backend server"""
    print("Starting metaverse backend server...")
    try:
        # Добавим текущую директорию в sys.path, чтобы можно было импортировать модули
        current_dir = os.path.dirname(os.path.abspath(__file__))
        backend_dir = os.path.join(current_dir, "backend")
        sys.path.insert(0, backend_dir)
        
        os.chdir(backend_dir)
        from app.main import start
        start()
    except ImportError as e:
        print(f"Error importing backend modules: {e}")
        print("Make sure you have installed all required packages.")
        sys.exit(1)

def main():
    parser = argparse.ArgumentParser(description="Run the Metaverse application")
    parser.add_argument("--setup", action="store_true", help="Setup environment before running")
    args = parser.parse_args()
    
    if args.setup:
        setup_environment()
    
    run_backend()

if __name__ == "__main__":
    main() 