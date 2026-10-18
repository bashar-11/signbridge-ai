"""
Universal Video Reader
"""

from pathlib import Path

import cv2

from .video_info import VideoInfo


class VideoReader:
    def __init__(self, video_path):

        self.video_path = Path(video_path)

        self.cap = cv2.VideoCapture(str(self.video_path))

        if not self.cap.isOpened():
            raise FileNotFoundError(video_path)

    def get_info(self):

        fps = self.cap.get(cv2.CAP_PROP_FPS)

        frames = int(self.cap.get(cv2.CAP_PROP_FRAME_COUNT))

        width = int(self.cap.get(cv2.CAP_PROP_FRAME_WIDTH))

        height = int(self.cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

        duration = frames / fps if fps else 0

        return VideoInfo(
            path=str(self.video_path),
            width=width,
            height=height,
            fps=fps,
            frame_count=frames,
            duration=duration,
        )

    def read(self):

        while True:
            success, frame = self.cap.read()

            if not success:
                break

            yield frame

    def release(self):

        self.cap.release()
