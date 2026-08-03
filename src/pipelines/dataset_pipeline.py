"""
Dataset Extraction Pipeline
"""

from pathlib import Path

from src.dataset.dataset_factory import DatasetFactory


class DatasetPipeline:

    def __init__(

        self,

        dataset_name,

        dataset_root,

    ):

        self.dataset = DatasetFactory.create(

            dataset_name,

            dataset_root,

        )

    def videos(self):

        for sample in self.dataset:

            yield sample.video_path