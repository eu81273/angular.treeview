/*
	@license Angular Treeview version 0.1.6
	ⓒ 2013 AHN JAE-HA http://github.com/eu81273/angular.treeview
	License: MIT


	[TREE attribute]
	angular-treeview: the treeview directive
	tree-id : each tree's unique id.
	tree-model : the tree model on $scope.
	node-id : each node's id
	node-label : each node's label
	node-children: each node's children

	<div
		data-angular-treeview="true"
		data-tree-id="tree"
		data-tree-model="fileList"
		data-node-id="id"
		data-node-label="name"
		data-node-type="type"
		data-node-type-container="folder"
		data-node-type-leaf="file"
		data-node-children="children" >
	</div>
*/

(function ( angular ) {
	'use strict';

	angular.module( 'angularTreeview', [] ).directive( 'treeModel', ['$compile', function( $compile ) {
		return {
			restrict: 'A',
			link: function ( scope, element, attrs ) {
				var treeId = attrs.treeId;
				var treeModel = attrs.treeModel;
				var nodeId = attrs.nodeId || 'id';
				var nodeLabel = attrs.nodeLabel || 'label';
				var nodeChildren = attrs.nodeChildren || 'children';
				var nodeType = attrs.nodeType || 'type';
				var nodeTypeContainer = attrs.nodeTypeContainer || 'folder';
				var nodeTypeLeaf = attrs.nodeTypeLeaf || 'file';

				//tree template
				var template =
					'<ul>' +
						'<li data-ng-repeat="node in ' + treeModel + '">' +
							'<span data-ng-show="node.' + nodeType + ' == \'' + nodeTypeContainer + '\'">' +
								'<i class="collapsed" data-ng-show="node.collapsed" data-ng-click="' + treeId + '.selectNodeHead(node)"></i>' +
								'<i class="expanded" data-ng-show="!node.collapsed" data-ng-click="' + treeId + '.selectNodeHead(node)"></i>' +
							'</span>' +
							'<span data-ng-show="node.' + nodeType + ' == \'' + nodeTypeLeaf + '\'">' +
								'<i class="normal" data-ng-hide="node.' + nodeChildren + '.length"></i> ' +
							'</span>' +
							'<span data-ng-class="node.selected" data-ng-click="' + treeId + '.selectNodeLabel(node)">{{node.' + nodeLabel + '}}</span>' +

							// template recurrency
							'<div data-ng-hide="node.collapsed" data-tree-id="' + treeId + '" data-tree-model="node.' + nodeChildren + '" data-node-id=' + nodeId +
								' data-node-label=' + nodeLabel + ' data-node-children=' + nodeChildren + ' data-node-type=' + nodeType +
								' data-node-type-container=' + nodeTypeContainer + ' data-node-type-leaf=' + nodeTypeLeaf + '></div>' +
						'</li>' +
					'</ul>';


				//check tree id, tree model
				if( treeId && treeModel ) {

					//root node
					if( attrs.angularTreeview ) {
					
						//create tree object if not exists
						scope[treeId] = scope[treeId] || {};

						//if node head clicks,
						scope[treeId].selectNodeHead = scope[treeId].selectNodeHead || function( selectedNode ){

							//Collapse or Expand
							selectedNode.collapsed = !selectedNode.collapsed;
						};

						//if node label clicks,
						scope[treeId].selectNodeLabel = scope[treeId].selectNodeLabel || function( selectedNode ){

							//remove highlight from previous node
							if( scope[treeId].currentNode && scope[treeId].currentNode.selected ) {
								scope[treeId].currentNode.selected = undefined;
							}

							//set highlight to selected node
							selectedNode.selected = 'selected';

							//set currentNode
							scope[treeId].currentNode = selectedNode;
						};
					}

					//Rendering template.
					element.html('').append( $compile( template )( scope ) );
				}
			}
		};
	}]);
})( angular );
