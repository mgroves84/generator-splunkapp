# Splunk application generator

A Splunk application generator for [Yeoman](http://yeoman.io).

## Usage

Install 

```
npm install -g generator-splunkapp
```

Make a new directory and `cd` into it:

```
mkdir my-new-app
cd my-new-app
```

Run `yo splunkapp` to generate new application

```
yo splunkapp
```

## Generators

Available generators:

* `splunkapp:jsmodel <name>` - generate new JavaScript Backbone model
* `splunkapp:jsview <name>` - generate new JavaScript Backbone view
* `splunkapp:jscollection <name>` - generate new JavaScript Backbone collection
* `splunkapp:view <name>` - generate new Django View
* `splunkapp:macro <name>` - generate new macro
* `splunkapp:scriptedinput <name>` - generate new scripted input
