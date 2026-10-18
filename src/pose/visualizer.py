"""
Draw pose results onto frames.

**Not implemented yet.** RTMO inference has to land before there is anything
worth drawing, and drawing placeholder skeletons risks producing output that
looks real but is not.

`draw` returns the image untouched rather than pretending to annotate.
"""

from typing import Any

import numpy as np


class PoseVisualizer:
    def draw(self, image: np.ndarray, result: Any) -> np.ndarray:
        """Return the frame unchanged until a pose backend is implemented."""
        return image
