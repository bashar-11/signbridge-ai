from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent

# ============================
# Original WLASL Dataset
# ============================

DATASET_ROOT = Path("/kaggle/input/datasets/risangbaskoro/wlasl-processed")

ANNOTATIONS_JSON = DATASET_ROOT / "WLASL_v0.3.json"

VIDEOS_DIR = DATASET_ROOT / "videos"

# ============================
# Output
# ============================

DATA_DIR = PROJECT_ROOT / "data"

ANNOTATIONS_DIR = DATA_DIR / "annotations"

VIDEOS_OUTPUT_DIR = DATA_DIR / "videos"

KEYPOINTS_DIR = DATA_DIR / "keypoints"

OUTPUT_DIR = ANNOTATIONS_DIR

# ============================
# Dataset Settings
# ============================

TOP_K_WORDS = 100

VIDEOS_PER_CLASS = 18

RANDOM_SEED = 42