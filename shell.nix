# This is a nix shell file that will install all the dependencies needed to run the webdev project
# Instructions can be found in README.md.
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
    
    # node-canvas required by chartjs fails on darwin due to missing CoreText
    pkgs.darwin.apple_sdk.frameworks.CoreText
  ];
}