# Laravel Horizon Watcher

This package includes a command called laravel-horizon-watcher that
will start the Horizon service and automatically restart it whenever 
a PHP file is created, modified, or deleted. 
It can be used with any Laravel application without requiring any additional configuration.
This.package is inspired by https://github.com/spatie/laravel-horizon-watcher

## Installation

```bash
npm i -g laravel-horizon-watcher
```

## Usage

Run this command in the root directory of your Laravel application:

```bash
laravel-horizon-watcher start
```

## Custom Php Interpreter

If you want to use a custom php interpreter, you can use the `--php` option:

```bash
laravel-horizon-watcher start --php="/usr/bin/php7.4"
```

## Custom Paths to Watch

If you want to watch a custom path, you can use the `--path` option:

```bash
laravel-horizon-watcher start --paths="app,config,.env"
```
