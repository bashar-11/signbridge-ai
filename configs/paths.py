from pathlib import Path
import os

# =====================================================
# Detect Environment
# =====================================================

IS_KAGGLE = os.path.exists("/kaggle")
IS_WINDOWS = os.name == "nt"

# =====================================================
# Project Root
# =====================================================

if IS_KAGGLE:
    PROJECT_ROOT = Path("/kaggle/working/SignBridge-AI")
    DATASET_ROOT = Path("/kaggle/input/datasets/risangbaskoro/wlasl-processed")
else:
    PROJECT_ROOT = Path(__file__).resolve().parents[1]
    DATASET_ROOT = PROJECT_ROOT / "data" / "raw"

# =====================================================
# Input
# =====================================================

VIDEOS_DIR = DATASET_ROOT / "videos"
ANNOTATIONS_JSON = DATASET_ROOT / "WLASL_v0.3.json"

# =====================================================
# Output
# =====================================================

OUTPUT_DIR = PROJECT_ROOT / "outputs"

KEYPOINTS_DIR = OUTPUT_DIR / "keypoints"

TOP100_DIR = OUTPUT_DIR / "top100"

CHECKPOINTS_DIR = OUTPUT_DIR / "checkpoints"

LOGS_DIR = OUTPUT_DIR / "logs"

# =====================================================
# Create folders automatically
# =====================================================

for folder in [
    OUTPUT_DIR,
    KEYPOINTS_DIR,
    TOP100_DIR,
    CHECKPOINTS_DIR,
    LOGS_DIR,
]:
    folder.mkdir(parents=True, exist_ok=True)