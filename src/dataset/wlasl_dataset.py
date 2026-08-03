import json

import pandas as pd

from pathlib import Path

from .base_dataset import BaseDataset


class WLASLDataset(BaseDataset):

    def __init__(self, dataset_root):

        super().__init__(dataset_root)

        self.video_dir = self.dataset_root / "videos"

        self.annotation_file = self.dataset_root / "WLASL_v0.3.json"

        self.class_file = self.dataset_root / "wlasl_class_list.txt"

    def load(self):

        with open(self.annotation_file) as f:

            annotations = json.load(f)

        video_index = {}

        for video in self.video_dir.glob("*.mp4"):

            video_index[video.stem] = str(video)

        samples = []

        for sign in annotations:

            gloss = sign["gloss"]

            for instance in sign["instances"]:

                video_id = instance["video_id"]

                if video_id in video_index:

                    samples.append({

                        "video_id": video_id,

                        "gloss": gloss,

                        "split": instance["split"],

                        "signer_id": instance["signer_id"],

                        "fps": instance["fps"],

                        "path": video_index[video_id]

                    })

        return pd.DataFrame(samples)

    def classes(self):

        with open(self.class_file) as f:

            return [line.strip() for line in f]

    def statistics(self):

        df = self.load()

        return {

            "videos": len(df),

            "classes": df["gloss"].nunique(),

            "train": (df["split"] == "train").sum(),

            "val": (df["split"] == "val").sum(),

            "test": (df["split"] == "test").sum()

        }