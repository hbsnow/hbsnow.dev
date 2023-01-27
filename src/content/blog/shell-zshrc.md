---
layout: "@/layouts/BlogPostLayout.astro"
title: 快適なターミナル環境を整備する
tags: [shell]
description: 快適なターミナル環境を整備する
createdAt: 2020-11-14
---

## shell

shell は Mac で現在ではデフォルトの zsh を使っています。

以前 fish を使っていたこともあるのですが、Web 上で公開されているスクリプトや設定がそのままでは動かないことが多く、メリットを上回るデメリットに感じたため今は使っていません。

## ターミナルエミュレータ

[Hyper](https://hyper.is/) を使っています。

[iTerm2](https://www.iterm2.com/) はクロスプラットフォームではないこと、[alacritty](https://github.com/alacritty/alacritty) は日本語入力の対応がなさそうなので採用を見送っています。

## anyenv

- [anyenv](https://github.com/anyenv/anyenv)
- [anyenv-update](https://github.com/znz/anyenv-update)
- [anyenv-git](https://github.com/znz/anyenv-git)
- [nodenv-package-json-engine](https://github.com/nodenv/nodenv-package-json-engine)

[nodenv-package-json-engine](https://github.com/nodenv/nodenv-package-json-engine) を入れておくと、プロジェクトによって使用する Node.js のバージョンを変更してくれます。

```json
"engines": {
  "node": "^8.0.0"
}
```

package.json に上記のようにバージョンが記述するか、あるいは .node-version を置いてくことが条件になります。

## Prezto

インストール方法についてはリンク先を参照してください。

- [Prezto](https://github.com/sorin-ionescu/prezto)

頑張れるのであれば [zplug](https://github.com/zplug/zplug) を使うことになるのですが、設定に強いこだわりがなく面倒なので Prezto を使っています。

Prezto の設定は `~/.zpreztorc` にあり、デフォルトだと [`syntax-highlighting`](https://github.com/sorin-ionescu/prezto/tree/master/modules/syntax-highlighting) が有効化されていないので、有効にしておくと便利です。

- [autosuggestions](https://github.com/sorin-ionescu/prezto/tree/master/modules/autosuggestions)
- [history-substring-search](https://github.com/sorin-ionescu/prezto/tree/master/modules/history-substring-search)

私は上記のモジュールも有効にしていて、最終的には次のモジュールを読み込ませています。

```
zstyle ':prezto:load' pmodule \
  'environment' \
  'terminal' \
  'editor' \
  'history' \
  'directory' \
  'spectrum' \
  'utility' \
  'completion' \
  'prompt' \
  'autosuggestions' \
  'history-substring-search' \
  'syntax-highlighting'
```

## prompt

- [pure](https://github.com/sindresorhus/pure)

以前は [powerline](https://github.com/powerline/powerline) を使っていたのですが、別途フォントのインストールが必要になります。環境によってはそれが許されないこともあるので、pure に乗り換えました。

こちらの設定も `~/.zpreztorc` を編集することで反映されます。

```diff
-zstyle ':prezto:module:prompt' theme 'sorin'
+zstyle ':prezto:module:prompt' theme 'pure'
```

## ghq

- [ghq](https://github.com/x-motemen/ghq)

コードを統一的に管理するツール。`ghq get` でリポジトリを取得して、fzf を使って検索ができるようになるととりあえず手元にもってくることが苦痛でなくなるので本当に便利。

ssh で clone するとき `ghq get -p` とすればいいんだけど、毎回オプションを忘れてます。

## fzf

- [fzf](https://github.com/junegunn/fzf)

以前は [peco](https://github.com/peco/peco) を使っていたのですが、左右に表示されるのがいいなと思って fzf を使い始めました。いまのところ ghq や cdr と組み合わせて使うくらいしかしていません。

- [6 歳娘｢パパ、プロジェクトフォルダを見つけるのに何時間かけるの？｣【ghq+fzf+zsh】](https://qiita.com/tomoyamachi/items/e51d2906a5bb24cf1684)
- [fzf で捗る自作コマンド一覧(zsh)](https://www.rasukarusan.com/entry/2018/08/14/083000)

## Icdiff

- [Icdiff](https://www.jefftk.com/icdiff)

VS Code が優秀なのであまりターミナル上で差分の確認をすることはありませんが、するときにあると便利なので入れています。

## AWS-CLI

- [AWS-CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)

もともとインストールはせず [aws にエイリアスを指定していた](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-docker.html#cliv2-docker-aliases)のですが、インストールをしないと補完がきかなかったため、結局インストールして以下を追加しました。

```zsh
autoload bashcompinit && bashcompinit
complete -C '/usr/local/bin/aws_completer' aws
```

## 最終的な .zshrc

```zsh
export LANG=ja_JP.UTF-8

export VISUAL='code -w'
export EDITOR=$VISUAL

autoload -Uz is-at-least
autoload bashcompinit && bashcompinit

# prezto
if [ -s "${ZDOTDIR:-$HOME}/.zprezto/init.zsh" ]; then
  source "${ZDOTDIR:-$HOME}/.zprezto/init.zsh"
fi

# aws
complete -C '/usr/local/bin/aws_completer' aws

# anyenv
if [ -d $HOME/.anyenv ]; then
  export PATH="$HOME/.anyenv/bin:$PATH"
  eval "$(anyenv init -)"
fi

# goenv
export GO111MODULE=on
export GOPATH=$HOME/go
export PATH=$GOPATH/bin:$PATH

# fzf
export FZF_DEFAULT_OPTS="--layout=reverse"

# ghq
function _ghq-fzf() {
  local src=$(ghq list | fzf --preview "ls -laTp $(ghq root)/{} | tail -n+4 | awk '{print \$9\"/\"\$6\"/\"\$7 \" \" \$10}'")
  if [ -n "$src" ]; then
    BUFFER="cd $(ghq root)/$src"
    zle accept-line
  fi
  zle -R -c
}
zle -N ghq-fzf _ghq-fzf
bindkey '^]' ghq-fzf

# cdr
if is-at-least 4.3.11; then
  autoload -Uz chpwd_recent_dirs cdr add-zsh-hook
  add-zsh-hook chpwd chpwd_recent_dirs
  chpwd_functions+=chpwd_recent_dirs
  zstyle ':chpwd:*' recent-dirs-max 1000
  zstyle ':chpwd:*' recent-dirs-default true
  zstyle ':completion:*' recent-dirs-insert always

  # 既に存在しないディレクトリをcdrのリストから削除する
  # https://blog.n-z.jp/blog/2014-07-25-compact-chpwd-recent-dirs.html
  function _my-compact-chpwd-recent-dirs() {
    emulate -L zsh
    setopt extendedglob
    local -aU reply
    integer history_size
    autoload -Uz chpwd_recent_filehandler
    chpwd_recent_filehandler
    history_size=$#reply
    reply=(${^reply}(N))
    (( $history_size == $#reply )) || chpwd_recent_filehandler $reply
  }
  _my-compact-chpwd-recent-dirs

  alias cdd='_fzf-cdr'
  function _fzf-cdr() {
    target_dir=`cdr -l | sed 's/^[^ ][^ ]*  *//' | fzf`
    target_dir=`echo ${target_dir/\~/$HOME}`
    if [ -n "$target_dir" ]; then
      cd $target_dir
    fi
  }
fi
```
