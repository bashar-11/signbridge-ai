"""
Frame Sampling
"""

import numpy as np


class FrameSampler:
    def __init__(
        self,
        target_fps=25,
    ):

        self.target_fps = target_fps

    def sample(
        self,
        frames,
        original_fps,
    ):

        if original_fps <= self.target_fps:
            return frames

        step = original_fps / self.target_fps

        indices = np.arange(
            0,
            len(frames),
            step,
        ).astype(int)

        return [frames[i] for i in indices]
