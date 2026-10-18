"""
Video Metadata
"""

from dataclasses import dataclass


@dataclass
class VideoInfo:
    path: str

    width: int

    height: int

    fps: float

    frame_count: int

    duration: float
