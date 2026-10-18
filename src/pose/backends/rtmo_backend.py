"""
RTMO pose backend.

**Not implemented yet.** The class exists so the backend contract and its call
sites are settled before the OpenMMLab dependency stack (mmpose / mmcv) is
wired in; mmcv in particular has to match the installed torch and CUDA build,
so it is kept in a separate requirements file.

Every method raises rather than silently returning nothing, so a caller cannot
mistake an unimplemented backend for one that found no poses.
"""

from src.pose.backends.base_backend import BaseBackend


class RTMOBackend(BaseBackend):
    def load(self):
        raise NotImplementedError(
            "RTMOBackend.load is not implemented. Install the pose extras "
            "(requirements-pose.txt) and wire up the mmpose model config."
        )

    def predict(self, frame):
        raise NotImplementedError("RTMOBackend.predict is not implemented.")

    def predict_video(self, video_path):
        raise NotImplementedError("RTMOBackend.predict_video is not implemented.")

    def export(self, output_path):
        raise NotImplementedError("RTMOBackend.export is not implemented.")
