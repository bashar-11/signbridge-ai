"""
Batch Pose Extraction
"""

from pathlib import Path

from .extractor import PoseExtractor
from .utils import is_video_file


class PoseRunner:

    def __init__(

        self,

        extractor: PoseExtractor,

    ):

        self.extractor = extractor

    def run(

        self,

        videos_directory: Path,

    ):

        for video in videos_directory.iterdir():

            if is_video_file(video):

                self.extractor.extract(video)