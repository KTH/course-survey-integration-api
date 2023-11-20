let
  sources = import ./.nix/sources.nix;
  pkgs = import sources.nixpkgs {};

in pkgs.mkShell rec {
  name = "webdev";

  buildInputs = with pkgs; [
    pkgs.azure-cli
    pkgs.nodejs_20
    pkgs.openssl
    pkgs.python310Full
  ];
}