from pathlib import Path
import json
from collections import Counter

JSON_PATH = Path("/kaggle/input/datasets/risangbaskoro/wlasl-processed/WLASL_v0.3.json")

with open(JSON_PATH, "r") as f:
    data = json.load(f)

counter = Counter()

for item in data:
    counter[item["gloss"]] = len(item["instances"])

top100 = counter.most_common(100)

print("=" * 60)
print("Top 100 Glosses")
print("=" * 60)

for i, (gloss, count) in enumerate(top100, 1):
    print(f"{i:03d}. {gloss:<25} {count}")