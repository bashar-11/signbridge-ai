"""
Video Pose Extractor
"""

from pathlib import Path

from .base_engine import BasePoseEngine


class PoseExtractor:

    def __init__(

        self,

        engine: BasePoseEngine,

    ):

        self.engine = engine

    def extract(

        self,

        video_path: Path,

    ):

        return self.engine.process_video(video_path)