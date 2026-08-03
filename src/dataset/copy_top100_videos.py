import json
import shutil
from pathlib import Path
from tqdm import tqdm

from configs.dataset_config import (
    VIDEOS_DIR,
    OUTPUT_DIR,
)

ANNOTATIONS = OUTPUT_DIR / "top100_annotations.json"
OUTPUT_VIDEOS = OUTPUT_DIR / "videos"

OUTPUT_VIDEOS.mkdir(parents=True, exist_ok=True)


def load_annotations():
    with open(ANNOTATIONS, "r", encoding="utf-8") as f:
        return json.load(f)


def main():

    data = load_annotations()

    copied = 0
    missing = 0

    for gloss in tqdm(data):

        word = gloss["gloss"]

        word_dir = OUTPUT_VIDEOS / word
        word_dir.mkdir(exist_ok=True)

        for instance in gloss["instances"]:

            video_name = instance["video_id"] + ".mp4"

            src = VIDEOS_DIR / video_name
            dst = word_dir / video_name

            if src.exists():

                shutil.copy2(src, dst)
                copied += 1

            else:
                missing += 1

    print("=" * 60)
    print("Copied :", copied)
    print("Missing:", missing)
    print("Output :", OUTPUT_VIDEOS)
    print("=" * 60)


if __name__ == "__main__":
    main()