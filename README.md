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

* `yo splunkapp:jsmodel <name>` - generate new JavaScript Backbone model
* `yo splunkapp:jsview <name>` - generate new JavaScript Backbone view
* `yo splunkapp:jscollection <name>` - generate new JavaScript Backbone collection
* `yo splunkapp:jsclass <name>` - generate new JavaScript class
* `yo splunkapp:styles <name>` - generate new CSS file
* `yo splunkapp:view <name>` - generate new Django View
* `yo splunkapp:macro <name>` - generate new macro
* `yo splunkapp:scriptedinput <name>` - generate new scripted input
