"""
Dataset selection settings.

These values decide which WLASL classes and videos the project trains on.
The limits matter: WLASL is class-imbalanced by a wide margin, so the top-N
glosses by instance count are selected and then capped per class to stop the
most common signs from dominating the split.
"""

from configs.paths import ANNOTATIONS_JSON, PROJECT_ROOT, VIDEOS_DIR

# ============================================================
# Original WLASL dataset (paths resolved in configs.paths)
# ============================================================

# ============================================================
# Output
# ============================================================

DATA_DIR = PROJECT_ROOT / "data"

ANNOTATIONS_DIR = DATA_DIR / "annotations"

VIDEOS_OUTPUT_DIR = DATA_DIR / "videos"

KEYPOINTS_DIR = DATA_DIR / "keypoints"

OUTPUT_DIR = ANNOTATIONS_DIR

# ============================================================
# Dataset settings
# ============================================================

# Number of glosses to keep, ranked by how many instances each has.
TOP_K_WORDS = 100

# Hard cap per class. Without this the most frequent glosses would supply a
# large share of every batch and the model would learn frequency, not sign.
VIDEOS_PER_CLASS = 22

# Fixed so the selected subset is reproducible across machines and reruns.
RANDOM_SEED = 42

__all__ = [
    "ANNOTATIONS_JSON",
    "VIDEOS_DIR",
    "DATA_DIR",
    "ANNOTATIONS_DIR",
    "VIDEOS_OUTPUT_DIR",
    "KEYPOINTS_DIR",
    "OUTPUT_DIR",
    "TOP_K_WORDS",
    "VIDEOS_PER_CLASS",
    "RANDOM_SEED",
]