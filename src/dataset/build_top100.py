import json
import random
from collections import Counter

from configs.dataset_config import (
    ANNOTATIONS_JSON,
    OUTPUT_DIR,
    TOP_K_WORDS,
    VIDEOS_PER_CLASS,
    RANDOM_SEED,
)

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
OUTPUT_JSON = OUTPUT_DIR / "top100_annotations.json"


def load_annotations():
    with open(ANNOTATIONS_JSON, "r", encoding="utf-8") as f:
        return json.load(f)


def main():

    random.seed(RANDOM_SEED)

    data = load_annotations()

    counter = Counter()

    for sample in data:
        counter[sample["gloss"]] += len(sample["instances"])

    top_words = {
        word for word, _ in counter.most_common(TOP_K_WORDS)
    }

    balanced = []

    total_videos = 0

    for sample in data:

        if sample["gloss"] not in top_words:
            continue

        instances = sample["instances"]

        if len(instances) > VIDEOS_PER_CLASS:
            instances = random.sample(
                instances,
                VIDEOS_PER_CLASS,
            )

        sample["instances"] = instances

        total_videos += len(instances)

        balanced.append(sample)

    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(balanced, f, indent=4)

    print("=" * 60)
    print("Classes :", len(balanced))
    print("Max Videos/Class :", VIDEOS_PER_CLASS)
    print("Total Videos :", total_videos)
    print("Saved :", OUTPUT_JSON)
    print("=" * 60)


if __name__ == "__main__":
    main()