import { cmdCall } from "./cmdCall"
import { cmdEnv } from "./cmdEnv"
import { cmdExpectCommandOutput } from "./expect-command-output"
import { cmdHasOutputContains } from "./output-contains"
import { redirectOutput } from "./redirect-output"
import { cmdInSubShell } from "./sub-shell"
import { define, Shell } from "./types"

export const Bash = {
  ...define<Shell>({
    binaryName: () => "bash",
    currentlySupported: () => true,
    name: () => "Bash",
    launchArgs: () => ["-i"],
    escapeText: (x) => x,
    dieOnErrors: () => `set -e`,
  }),
  ...cmdEnv.bash,
  ...cmdCall.all,
  ...redirectOutput.bash,
  ...cmdExpectCommandOutput.bash,
  ...cmdHasOutputContains.bash,
  ...cmdInSubShell.bash,
}

export const Zsh = {
  ...define<Shell>({
    binaryName: () => "zsh",
    currentlySupported: () => process.platform !== "win32",
    name: () => "Zsh",
    launchArgs: () => [],
    escapeText: (x) => x,
    dieOnErrors: () => `set -e`,
  }),
  ...cmdEnv.bash,
  ...cmdCall.all,
  ...redirectOutput.bash,
  ...cmdExpectCommandOutput.bash,
  ...cmdHasOutputContains.bash,
  ...cmdInSubShell.zsh,
}

export const Fish = {
  ...define<Shell>({
    binaryName: () => "fish",
    currentlySupported: () => process.platform !== "win32",
    name: () => "Fish",
    launchArgs: () => [],
    escapeText: (x) => x,
    forceFile: true,
  }),
  ...cmdEnv.fish,
  ...cmdCall.all,
  ...redirectOutput.bash,
  ...cmdExpectCommandOutput.fish,
  ...cmdHasOutputContains.fish,
  ...cmdInSubShell.fish,
}

export const PowerShell = {
  ...define<Shell>({
    binaryName: () => "pwsh",
    forceFile: ".ps1",
    currentlySupported: () => true,
    name: () => "PowerShell",
    launchArgs: () => ["-NoProfile"],
    escapeText: (x) => x,
    dieOnErrors: () => `$ErrorActionPreference = "Stop"`,
  }),
  ...cmdEnv.powershell,
  ...cmdCall.all,
  ...redirectOutput.powershell,
  ...cmdExpectCommandOutput.powershell,
  ...cmdHasOutputContains.powershell,
  ...cmdInSubShell.powershell,
}

export const WinCmd = {
  ...define<Shell>({
    binaryName: () => "cmd.exe",
    currentlySupported: () => process.platform === "win32",
    name: () => "Windows Command Prompt",
    launchArgs: () => [],
    escapeText: (str) =>
      str
        .replace(/\r/g, "")
        .replace(/\n/g, "^\n\n")
        .replace(/\%/g, "%%")
        .replace(/\|/g, "^|")
        .replace(/\(/g, "^(")
        .replace(/\)/g, "^)"),
  }),
  ...cmdEnv.wincmd,
  ...cmdCall.all,
  ...cmdExpectCommandOutput.wincmd,
  ...redirectOutput.bash,
}