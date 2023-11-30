let
  sources = import ./nix/sources.nix;
  pkgs = import sources.nixpkgs {};

in pkgs.mkShell rec {
  name = "webdev";

  buildInputs = with pkgs; [
    azure-cli
    azure-functions-core-tools
    nodejs_20
    openssl
    # node-gyp has issues with certain versions of python
    # https://github.com/nodejs/node-gyp/issues/2219
    # If this is resolved we can remove this:
    python310Full
  ];
}