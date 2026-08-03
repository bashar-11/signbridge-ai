"""
Batch Keypoint Extraction
"""

from pathlib import Path

from tqdm import tqdm

from src.pipelines.extract_keypoints import KeypointExtractionPipeline


class BatchExtractionPipeline:

    def __init__(

        self,

        pipeline: KeypointExtractionPipeline,

    ):

        self.pipeline = pipeline

    def run(

        self,

        videos,

    ):

        for video in tqdm(videos):

            self.pipeline.run(video)