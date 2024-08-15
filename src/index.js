const os = require('os');
const path = require('path');
const core = require('@actions/core');
const tc = require('@actions/tool-cache');

async function setup() {
  try {
      let version = core.getInput("version");

      if (version === "") {
        core.info("Version not set, fetching latest");
        const resp = await fetch("https://api.github.com/repos/stacc/blocc-cli-releases/releases/latest");
        const json = await resp.json();
        version = json.name.replace("cli-v", "");
      }

      core.info(`Using version ${version}`);

      let localBloccPath = tc.find('blocc', version);

      if (localBloccPath === '') {
        const bloccPath = await tc.downloadTool(`https://github.com/stacc/blocc-cli-releases/releases/download/cli-v${version}/blocc_${version}_${os.platform()}_${os.arch() === "x64" ? "amd64" : os.arch()}.tar.gz`);
        const bloccExtractedFolder = await tc.extractTar(bloccPath);
        
        localBloccPath = await tc.cacheFile(path.join(bloccExtractedFolder, 'blocc'), 'blocc', 'blocc', version);
      }

      core.addPath(localBloccPath);
  } catch(error) {
    core.setFailed(error.message);
  }
}

setup();

