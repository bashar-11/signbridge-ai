"""
Base interface for all Pose Estimation engines.

Every pose backend (RTMPose, MediaPipe, OpenPose ...)
must inherit from this class.
"""

from abc import ABC, abstractmethod
from pathlib import Path
from typing import Dict, Any

import numpy as np


class BasePoseEngine(ABC):

    def __init__(self, device: str = "cuda"):

        self.device = device
        self.model = None

    @abstractmethod
    def load_model(self) -> None:
        """
        Load the pose model.
        """
        pass

    @abstractmethod
    def infer(self, frame: np.ndarray) -> Dict[str, Any]:
        """
        Run inference on one frame.

        Returns
        -------
        Dict
            body
            face
            left_hand
            right_hand
        """
        pass

    @abstractmethod
    def process_video(self, video_path: Path):
        """
        Process a complete video.
        """
        pass