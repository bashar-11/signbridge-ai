from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent

DATA_DIR = PROJECT_ROOT / "data"

ANNOTATIONS_DIR = DATA_DIR / "annotations"

VIDEOS_OUTPUT_DIR = DATA_DIR / "videos"

KEYPOINTS_DIR = DATA_DIR / "keypoints"

OUTPUT_DIR = ANNOTATIONS_DIR