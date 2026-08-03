"""
Utility functions for pose extraction.
"""

from pathlib import Path


def ensure_directory(path: Path):

    path.mkdir(parents=True, exist_ok=True)


def is_video_file(path: Path):

    return path.suffix.lower() in {

        ".mp4",

        ".avi",

        ".mov",

        ".mkv",

        ".webm",

    }