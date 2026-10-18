"""
Video Writer
"""

import cv2


class VideoWriter:
    def __init__(
        self,
        output,
        fps,
        width,
        height,
    ):

        fourcc = cv2.VideoWriter_fourcc(*"mp4v")

        self.writer = cv2.VideoWriter(
            output,
            fourcc,
            fps,
            (width, height),
        )

    def write(self, frame):

        self.writer.write(frame)

    def close(self):

        self.writer.release()
