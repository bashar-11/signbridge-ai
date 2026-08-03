from .base_backend import BaseBackend


class RTMPoseBackend(BaseBackend):

    def __init__(

        self,

        config,

        checkpoint,

        device="cuda",

    ):

        self.config = config
        self.checkpoint = checkpoint
        self.device = device
        self.model = None

    def load(self):

        pass

    def infer(self, frame):

        pass