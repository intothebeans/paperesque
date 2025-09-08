let
  nixpkgs = fetchTarball "https://github.com/NixOS/nixpkgs/tarball/nixos-25.05";
  pkgs = import nixpkgs {
    config = {};
    overlays = [];
  };
in
  pkgs.mkShell {
    packages = with pkgs; [
      alejandra
      dart-sass
      eslint
      hugo
      nodejs
      uv
      yarn
    ];
    shellHook = ''
      uv venv .venv --allow-existing
      uv pip install cz-conventional-gitmoji commitizen pre-commit
      source .venv/bin/activate
    '';
  }
