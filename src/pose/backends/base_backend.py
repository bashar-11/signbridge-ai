"""
Pose backend extension point.

Every pose backend (RTMO, RTMPose, MediaPipe, OpenPose ...) implements
``BaseBackend``. Keeping the interface separate from the engine contract in
``src.pose.base_engine`` lets a backend be swapped without touching callers.
"""

from abc import ABC, abstractmethod


class BaseBackend(ABC):
    """Minimal contract every pose backend must satisfy."""

    @abstractmethod
    def load(self):
        """Load the model weights and return the loaded model handle."""

    @abstractmethod
    def predict(self, frame):
        """Run inference on a single frame and return raw detections."""

    @abstractmethod
    def predict_video(self, video_path):
        """Run inference over a whole video and return per-frame results."""

    @abstractmethod
    def export(self, output_path):
        """Export the model to an ONNX file at ``output_path``."""
