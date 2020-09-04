import * as core from '@actions/core';
import * as jwt from 'jsonwebtoken';

async function run() {
  try {
    const secret = core.getInput('secret', { required: true });
    const payload = core.getInput('payload', { required: true });
    const options = core.getInput('options', { required: false });
    const tokenExportVariableName = core.getInput('envVar', {
      required: false,
    });
    let jsonOptions = {};
    if (options) {
      core.info(`Got options: '${options}'`);
      try {
        core.info(`Attempting to parse options`);
        jsonOptions = JSON.parse(options);
      } catch (err) {
        core.setFailed(`Action failed parsing options with error '${err}'`);
      }
    }
    const token = jwt.sign(payload, secret, jsonOptions);

    core.setSecret(token);
    core.exportVariable(tokenExportVariableName || 'JWT_TOKEN', token);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
