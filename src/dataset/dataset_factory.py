from .wlasl_dataset import WLASLDataset


class DatasetFactory:

    @staticmethod
    def create(name, root):

        name = name.lower()

        if name == "wlasl":

            return WLASLDataset(root)

        raise ValueError(f"{name} is not supported.")