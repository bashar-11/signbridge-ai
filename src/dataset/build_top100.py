import json
from collections import Counter
from pathlib import Path

from configs.dataset_config import (
    ANNOTATIONS_JSON,
    OUTPUT_DIR,
    TOP_K_WORDS,
)

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

OUTPUT_JSON = OUTPUT_DIR / "top100_annotations.json"


def load_annotations():
    with open(ANNOTATIONS_JSON, "r", encoding="utf-8") as f:
        return json.load(f)


def count_words(data):
    counter = Counter()

    for sample in data:
        gloss = sample["gloss"]
        counter[gloss] += len(sample["instances"])

    return counter


def build_dataset(data, selected_words):
    output = []

    for sample in data:
        if sample["gloss"] in selected_words:
            output.append(sample)

    return output


def main():

    data = load_annotations()

    counter = count_words(data)

    top_words = {
        word
        for word, _ in counter.most_common(TOP_K_WORDS)
    }

    dataset = build_dataset(data, top_words)

    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(dataset, f, indent=4)

    print("=" * 60)
    print("Top Words :", len(top_words))
    print("Glosses   :", len(dataset))
    print("Saved To  :", OUTPUT_JSON)
    print("=" * 60)


if __name__ == "__main__":
    main()