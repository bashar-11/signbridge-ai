"""
Extract Keypoints from one video
"""

from pathlib import Path

from src.pose.extractor import PoseExtractor


class KeypointExtractionPipeline:
    def __init__(
        self,
        extractor: PoseExtractor,
    ):

        self.extractor = extractor

    def run(
        self,
        video_path: Path,
    ):

        return self.extractor.extract(video_path)
