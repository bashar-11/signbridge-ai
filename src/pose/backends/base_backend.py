from abc import ABC, abstractmethod


class BaseBackend(ABC):

    @abstractmethod
    def load(self):
        pass

    @abstractmethod
    def infer(self, frame):
        pass