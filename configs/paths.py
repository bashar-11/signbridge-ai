"""
Filesystem layout for the project.

Paths are resolved once, at import time, but **nothing is created here**.
Creating directories as an import side effect makes the module unsafe to
import from tests, notebooks and tooling, and it silently writes to disk just
because something read a config. Call `ensure_output_dirs()` for that instead.

Both the project root and the dataset root can be overridden with environment
variables, which is what makes the same code run locally and on Kaggle without
edits:

    SIGNBRIDGE_ROOT    project root
    WLASL_ROOT         dataset root
"""

import os
from pathlib import Path

# =====================================================
# Environment
# =====================================================

IS_KAGGLE = Path("/kaggle").exists()
IS_WINDOWS = os.name == "nt"

# =====================================================
# Roots
# =====================================================

PROJECT_ROOT = Path(
    os.environ.get("SIGNBRIDGE_ROOT", Path(__file__).resolve().parents[1])
).resolve()

# On Kaggle the dataset is mounted read-only under /kaggle/input. Locally it is
# expected under data/raw.
_default_dataset_root = (
    Path("/kaggle/input/datasets/risangbaskoro/wlasl-processed")
    if IS_KAGGLE
    else PROJECT_ROOT / "data" / "raw"
)
DATASET_ROOT = Path(os.environ.get("WLASL_ROOT", _default_dataset_root)).resolve()

# =====================================================
# Input
# =====================================================

VIDEOS_DIR = DATASET_ROOT / "videos"
ANNOTATIONS_JSON = DATASET_ROOT / "WLASL_v0.3.json"
CLASS_LIST = DATASET_ROOT / "wlasl_class_list.txt"

# =====================================================
# Output
# =====================================================

OUTPUT_DIR = PROJECT_ROOT / "outputs"

KEYPOINTS_DIR = OUTPUT_DIR / "keypoints"

TOP100_DIR = OUTPUT_DIR / "top100"

CHECKPOINTS_DIR = OUTPUT_DIR / "checkpoints"

LOGS_DIR = OUTPUT_DIR / "logs"

OUTPUT_DIRS = (
    OUTPUT_DIR,
    KEYPOINTS_DIR,
    TOP100_DIR,
    CHECKPOINTS_DIR,
    LOGS_DIR,
)


def ensure_output_dirs() -> None:
    """Create the output directories. Explicit, never an import side effect."""
    for folder in OUTPUT_DIRS:
        folder.mkdir(parents=True, exist_ok=True)


def dataset_is_available() -> bool:
    """True when the WLASL annotations file is present on disk."""
    return ANNOTATIONS_JSON.exists()