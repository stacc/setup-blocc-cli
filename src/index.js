const os = require('os');
const path = require('path');
const core = require('@actions/core');
const tc = require('@actions/tool-cache');

async function setup() {
  try {
      let version = core.getInput("version");

      if (version === "") {
        core.info("Version not set, fetching latest");
        const token = core.getInput("token");
        const resp = await fetch("https://api.github.com/repos/stacc/blocc-cli-releases/releases/latest", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!resp.ok) {
          throw new Error(`Failed to fetch latest blocc release: ${resp.status} ${await resp.text()}`);
        }
        const json = await resp.json();
        version = json.tag_name.replace("cli-v", "");
      }

      core.info(`Using version ${version}`);

      let localBloccPath = tc.find('blocc', version);

      if (localBloccPath === '') {
        const beta = version.includes("-beta.");
        const tag = beta ? `beta-cli-v${version}` : `cli-v${version}`;
        const binary = beta ? "blocc-beta" : "blocc";
        const arch = os.arch() === "x64" ? "amd64" : os.arch();
        const bloccPath = await tc.downloadTool(`https://github.com/stacc/blocc-cli-releases/releases/download/${tag}/${binary}_${version}_${os.platform()}_${arch}.tar.gz`);
        const bloccExtractedFolder = await tc.extractTar(bloccPath);

        localBloccPath = await tc.cacheFile(path.join(bloccExtractedFolder, binary), 'blocc', 'blocc', version);
      }

      core.addPath(localBloccPath);
  } catch(error) {
    core.setFailed(error.message);
  }
}

setup();

