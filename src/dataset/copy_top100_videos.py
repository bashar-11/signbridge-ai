import json
import shutil

from tqdm import tqdm

from configs.dataset_config import (
    OUTPUT_DIR,
    VIDEOS_DIR,
    VIDEOS_OUTPUT_DIR,
)

ANNOTATIONS = OUTPUT_DIR / "top100_annotations.json"


def load_annotations():

    with open(ANNOTATIONS, encoding="utf-8") as f:
        return json.load(f)


def main():

    VIDEOS_OUTPUT_DIR.mkdir(
        parents=True,
        exist_ok=True,
    )

    data = load_annotations()

    copied = 0
    missing = 0

    for gloss in tqdm(data):
        word = gloss["gloss"]

        save_dir = VIDEOS_OUTPUT_DIR / word

        save_dir.mkdir(exist_ok=True)

        for instance in gloss["instances"]:
            video = instance["video_id"] + ".mp4"

            src = VIDEOS_DIR / video

            dst = save_dir / video

            if src.exists():
                shutil.copy2(src, dst)

                copied += 1

            else:
                missing += 1

    print("=" * 60)
    print("Copied :", copied)
    print("Missing :", missing)
    print("Classes :", len(data))
    print("Output :", VIDEOS_OUTPUT_DIR)
    print("=" * 60)


if __name__ == "__main__":
    main()
