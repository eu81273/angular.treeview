Angular Treeview
================

Pure [AngularJS](http://www.angularjs.org) based tree menu directive.

[![ScreenShot](https://github.com/eu81273/angular.treeview/raw/master/img/preview.png)](http://jsfiddle.net/eu81273/8LWUc/)

## Installation

Copy the script and css into your project and add a script and link tag to your page.

```html
<script type="text/javascript" src="/angular.treeview.js"></script>
<link rel="stylesheet" type="text/css" href="css/angular.treeview.css">
```

Add a dependency to your application module.

```javascript
angular.module('myApp', ['angularTreeview']);
```

Add a tree to your application. See [Usage](#usage).

## Usage (modified in fork)

Attributes of angular treeview are below.

- angular-treeview: the treeview directive
- tree-id : tree's unique id
- tree-model : the tree model on $scope
- node-id : each node's id
- node-label : name of key determining a label
- node-type : each node's type (look `type-container` and `type-leaf`)
- node-type-container : name of type for nodes which are containers (has children)
- node-type-leaf : name of type for nodes which don't have children
- node-children: each node's children

Here is a simple example.


```html
<div
    data-angular-treeview="true"
	data-tree-id="myFileList"
	data-tree-model="fileList"
	data-node-id="id"
	data-node-label="name"
	data-node-type="type"
	data-node-type-container="folder"
	data-node-type-leaf="file"
	data-node-children="children" >
</div>
```

Example model:

```javascript
$scope.treedata = 
[
	{ "name": "Photos", "id": 1, "type": "folder", "children": [
		{ "name": "my photo.jpg", "id": 11, "type": "file", "children": [] },
		{ "name": "Holidays", "id": 12, "type": "folder", "children" : [
			{ "name": "2015 - March", "id": 121, "type": "folder", "children": [
				{ "name": "photo1.jpg", "id": 1211, "type": "file", "children" : [] },
				{ "name": "photo2.jpg", "id": 1212, "type": "file", "children": [] }
			]}
		]}
	]},
	{ "name": "Videos", "id": 2, "type": "folder", "children": [] },
	{ "name": "Notes", "id": 3, "type": "folder", "children": [] }
];	 
```

Note: unfortunately, AFAIR, even file nodes need empty `children` collection. Probably needs a fix (PRs?).

## Selection

If tree node is selected, then that selected tree node is saved to $scope."TREE ID".currentNode. By using $watch, the controller can recognize the tree selection.


```javascript
$scope.$watch( 'abc.currentNode', function( newObj, oldObj ) {
    if( $scope.abc && angular.isObject($scope.abc.currentNode) ) {
        console.log( 'Node Selected!!' );
        console.log( $scope.abc.currentNode );
    }
}, false);
```

## Examples

#### Basic example
[![ScreenShot](https://github.com/eu81273/angular.treeview/raw/master/img/jsfiddle01.png)](http://jsfiddle.net/eu81273/8LWUc/)

[jsFiddle - http://jsfiddle.net/eu81273/8LWUc/](http://jsfiddle.net/eu81273/8LWUc/)

#### Multiple treeview example
[![ScreenShot](https://github.com/eu81273/angular.treeview/raw/master/img/jsfiddle02.png)](http://jsfiddle.net/eu81273/b9Pnw/)

[jsFiddle - http://jsfiddle.net/eu81273/b9Pnw/](http://jsfiddle.net/eu81273/b9Pnw/)

## Browser Compatibility

Same with AngularJS. Safari, Chrome, Firefox, Opera, IE8, IE9 and mobile browsers (Android, Chrome Mobile, iOS Safari).

## Changelogs

#### version 0.1.6
- Fixed the bug that 'null' string appears before each 'div' generated. (Thanks to Iaac)

#### version 0.1.5
- support multiple treeview. (Thanks to Axel Pesme)

#### version 0.1.4
- prevented memory leaks.

#### version 0.1.3
- removed unnecessary codes.

#### version 0.1.2
- removed some jQuery dependency. (Issue #2)

## License

The MIT License.

Copyright ⓒ 2013 AHN JAE-HA.

See [LICENSE](https://github.com/eu81273/angular.treeview/blob/master/LICENSE)
