"""
Select a balanced, reproducible subset of WLASL for training.

WLASL is heavily imbalanced: a handful of glosses have thousands of instances
while many have a handful. Training on the raw distribution teaches the model
how frequent a sign is rather than what it looks like, so this script takes the
`TOP_K_WORDS` glosses with the most instances and then caps each one at
`VIDEOS_PER_CLASS`.

Run:
    python -m src.dataset.build_top100
"""

import json
import random
from collections import Counter
from pathlib import Path
from typing import Any, Dict, List

from configs.dataset_config import (
    ANNOTATIONS_JSON,
    OUTPUT_DIR,
    RANDOM_SEED,
    TOP_K_WORDS,
    VIDEOS_PER_CLASS,
)

OUTPUT_JSON = OUTPUT_DIR / "top100_annotations.json"


def load_annotations(path: Path | str = ANNOTATIONS_JSON) -> List[Dict[str, Any]]:
    """Load the raw WLASL annotation file."""
    with open(path, "r", encoding="utf-8") as fh:
        return json.load(fh)


def select_top_classes(
    data: List[Dict[str, Any]],
    top_k: int = TOP_K_WORDS,
    per_class: int = VIDEOS_PER_CLASS,
    seed: int = RANDOM_SEED,
) -> List[Dict[str, Any]]:
    """
    Keep the `top_k` most frequent glosses, capped at `per_class` instances each.

    Sampling is seeded, so the same call on the same input always yields the
    same subset. That matters because the videos copied by
    `copy_top100_videos` and any later keypoint extraction have to line up with
    exactly this selection.
    """
    rng = random.Random(seed)

    counts = Counter()
    for sample in data:
        counts[sample["gloss"]] += len(sample["instances"])

    top_words = {word for word, _ in counts.most_common(top_k)}

    balanced: List[Dict[str, Any]] = []
    for sample in data:
        if sample["gloss"] not in top_words:
            continue

        sample = dict(sample)
        instances = list(sample["instances"])
        if len(instances) > per_class:
            instances = rng.sample(instances, per_class)

        sample["instances"] = instances
        balanced.append(sample)

    return balanced


def main() -> None:
    data = load_annotations()
    balanced = select_top_classes(data)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_JSON, "w", encoding="utf-8") as fh:
        json.dump(balanced, fh, indent=4)

    total = sum(len(s["instances"]) for s in balanced)
    print("=" * 46)
    print(f"Classes          : {len(balanced)}")
    print(f"Max videos/class : {VIDEOS_PER_CLASS}")
    print(f"Total videos     : {total}")
    print(f"Saved to         : {OUTPUT_JSON}")
    print("=" * 46)


if __name__ == "__main__":
    main()