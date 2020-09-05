import * as core from '@actions/core';
import * as jwt from 'jsonwebtoken';

function stringToJSON(input: string, name: string) {
  try {
    const retVal = JSON.parse(input);
    return retVal;
  } catch (err) {
    core.setFailed(`Action failed parsing options with error '${err}'`);
    return undefined;
  }
}

async function run() {
  try {
    const secret = core.getInput('secret', { required: true });
    const payload = stringToJSON(
      core.getInput('payload', { required: true }),
      'payload',
    );
    const options = stringToJSON(
      core.getInput('options', { required: false }),
      'options',
    );
    const tokenExportVariableName = core.getInput('envVar', {
      required: false,
    });
    if (!payload) {
      return core.setFailed(`Payload input required but got '${payload}'`);
    }
    const token = jwt.sign(payload, secret, options);
    core.exportVariable(tokenExportVariableName || 'JWT_TOKEN', token);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
