import json
from collections import Counter

from configs.dataset_config import (
    ANNOTATIONS_JSON,
    TOP100_JSON,
    TOP_K_CLASSES,
)


def load_annotations():

    with open(ANNOTATIONS_JSON, "r", encoding="utf-8") as f:
        return json.load(f)


def build_top100(data):

    counter = Counter()

    for sample in data:
        counter[sample["gloss"]] = len(sample["instances"])

    top_classes = counter.most_common(TOP_K_CLASSES)

    selected = {name for name, _ in top_classes}

    filtered = [
        sample
        for sample in data
        if sample["gloss"] in selected
    ]

    return filtered, top_classes


def save_annotations(data):

    with open(TOP100_JSON, "w", encoding="utf-8") as f:
        json.dump(
            data,
            f,
            indent=4,
            ensure_ascii=False,
        )


def print_statistics(top_classes):

    print("=" * 60)
    print("Top Classes")
    print("=" * 60)

    total = 0

    for idx, (name, count) in enumerate(top_classes, start=1):

        total += count

        print(f"{idx:03d}. {name:<25} {count}")

    print("=" * 60)
    print("Classes :", len(top_classes))
    print("Videos  :", total)
    print("=" * 60)


def main():

    data = load_annotations()

    filtered, top_classes = build_top100(data)

    save_annotations(filtered)

    print_statistics(top_classes)

    print()
    print("Saved to:")
    print(TOP100_JSON)


if __name__ == "__main__":
    main()