# Contributing to SignBridge AI

## Setup

```bash
git clone https://github.com/bashar-11/signbridge-ai.git
cd signbridge-ai

python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

pip install -r requirements.txt
pip install pytest ruff
```

The frontend is a separate install:

```bash
cd frontend/web
npm ci
```

## Before you open a pull request

```bash
ruff check src configs scripts tests   # Python lint
pytest tests -q                        # Python tests

cd frontend/web
npm run typecheck                      # TypeScript
npm run build                          # production build
```

CI runs all four, plus a dependency audit on Python and npm.

## Conventions

**No import side effects.** Importing a module must not create directories,
download anything or write files. If a module needs a directory, expose a
function that creates it and let the caller decide when.

**Paths come from the environment.** Never hardcode an absolute path. Use
`configs.paths`, which reads `SIGNBRIDGE_ROOT` and `WLASL_ROOT` and falls back
to sensible local defaults.

**Unimplemented means raising.** A stub should raise `NotImplementedError` with
a message that says what to do next. Returning an empty result from an
unimplemented function hides the gap: the caller cannot tell "nothing matched"
from "nothing was ever built".

**Keep heavy imports inside functions.** `torch`, `mmcv` and `mmpose` are not
installable on every machine. Importing them lazily inside the function that
needs them is what lets the test suite run without them.

## Tests

The suite must run with no dataset, no GPU and no pose stack. If you add
something that needs one of those, guard it with `pytest.mark.skipif` and a
clear reason.

`tests/test_build_top100.py` is the one to read first: it documents the three
guarantees the subset selection makes — reproducibility, the per-class cap, and
dropping rare classes.

## Datasets and archives

Datasets, model weights and generated outputs are git-ignored. So are `*.zip`
files: an archive of a directory that is already in the repository is pure
duplication, and it silently goes stale.

## Interface changes

The interface is specified in `docs/UI/`. If you change a component, the tokens
it uses or the routing, update the corresponding document in the same pull
request. The spec and the implementation drifting apart is worse than either
one being slightly out of date.

## Reporting bugs

Open an issue with your Python version, your platform, whether you are running
with or without the pose stack, and the exact error.