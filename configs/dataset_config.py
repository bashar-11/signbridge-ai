"""
==========================================================
Dataset Configuration
Project: SignBridge-AI
==========================================================
"""

from pathlib import Path
import os


# ==========================================================
# Environment Detection
# ==========================================================

IS_KAGGLE = os.path.exists("/kaggle")

IS_WINDOWS = os.name == "nt"


# ==========================================================
# Project Root
# ==========================================================

if IS_KAGGLE:

    PROJECT_ROOT = Path("/kaggle/working/SignBridge-AI")

    DATASET_ROOT = Path(
        "/kaggle/input/datasets/risangbaskoro/wlasl-processed"
    )

else:

    PROJECT_ROOT = Path(__file__).resolve().parents[1]

    DATASET_ROOT = PROJECT_ROOT / "data" / "raw"


# ==========================================================
# Original Dataset
# ==========================================================

VIDEOS_DIR = DATASET_ROOT / "videos"

ANNOTATIONS_JSON = DATASET_ROOT / "WLASL_v0.3.json"

CLASS_LIST = DATASET_ROOT / "wlasl_class_list.txt"


# ==========================================================
# Output Dataset
# ==========================================================

OUTPUT_DIR = PROJECT_ROOT / "outputs"

TOP100_DIR = OUTPUT_DIR / "top100"

TOP100_VIDEO_DIR = TOP100_DIR / "videos"

TOP100_JSON = TOP100_DIR / "annotations_top100.json"

KEYPOINTS_DIR = OUTPUT_DIR / "keypoints"


# ==========================================================
# Dataset Settings
# ==========================================================

TOP_K_CLASSES = 100

MIN_SAMPLES_PER_CLASS = 20

VIDEO_EXTENSION = ".mp4"


# ==========================================================
# Video Processing
# ==========================================================

TARGET_FPS = 30

MAX_FRAMES = 128

FRAME_STRATEGY = "uniform"


# ==========================================================
# Dataset Split
# ==========================================================

TRAIN_RATIO = 0.80

VAL_RATIO = 0.10

TEST_RATIO = 0.10


# ==========================================================
# Random Seed
# ==========================================================

RANDOM_SEED = 42


# ==========================================================
# Create Output Folders
# ==========================================================

directories = [

    OUTPUT_DIR,

    TOP100_DIR,

    TOP100_VIDEO_DIR,

    KEYPOINTS_DIR,

]

for directory in directories:
    directory.mkdir(parents=True, exist_ok=True)